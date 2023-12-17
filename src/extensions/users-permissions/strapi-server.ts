import { findAll } from "../../helper/apiHelper";
import {
  USER_ROUTE,
  ERROR_VALIDATION,
  ERROR_EMAIL_CONFIRMED,
  ERROR_ACCOUNT_BLOCKED,
  ERROR_PROVIDER,
  ERROR_ALREADY_EXISTS_EMAIL,
  ERROR_ALREADY_EXISTS_USERNAME,
  ERROR_SPECIAL_CHARACTER_USERNAME,
  USER_ROLE_ROUTE,
} from "../../helper/constants";
import { sanitizeOutput } from "../../helper/transform";
import { setQueryUsers } from "./services/utils";
import utils from "@strapi/utils";
const { ApplicationError, ValidationError } = utils.errors;
import _ from "lodash";
import { containsSpecialCharacters } from "../../helper/unorm";
const { yup, validateYupSchema, sanitize, validate } = utils;

module.exports = (plugin) => {
  const validateCreateUserBody = validateYupSchema(
    yup.object().shape({
      email: yup.string().email().required(),
      username: yup.string().min(1).required(),
      password: yup.string().min(1).required(),
      role: yup.lazy((value) =>
        typeof value === "object"
          ? yup
            .object()
            .shape({
              connect: yup
                .array()
                .of(yup.object().shape({ id: yup.strapiID().required() }))
                .min(1, "Users must have a role")
                .required(),
            })
            .required()
          : yup.strapiID().required(),
      ),
    }),
  );
  const validateCallbackBody = validateYupSchema(
    yup.object({
      identifier: yup.string().required(),
      password: yup.string().required(),
    }),
  );

  const getService = (name) => {
    return strapi.plugin("users-permissions").service(name);
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }

    const user = await strapi.entityService.findOne(
      USER_ROUTE,
      ctx.state.user.id,
      {
        populate: {
          role: true,
          sale: {
            fields: ["username", "email"],
          },
          banks: true,
        },
      },
    );

    ctx.body = sanitizeOutput(user, [
      "password",
      "resetPasswordToken",
      "confirmationToken",
    ]);
  };

  plugin.controllers.user.find = async (ctx) => {
    const schema = strapi.contentType(USER_ROUTE);
    const { auth } = ctx.state;
    await validate.contentAPI.query(ctx.query, schema, {
      auth,
    });
    const { results: users, pagination } = await findAll(
      USER_ROUTE,
      ctx,
      setQueryUsers,
    );
    ctx.body = {
      data: await Promise.all(
        users.map(
          async (user: any) =>
            await sanitize.contentAPI.output(user, schema, { auth }),
        ),
      ),
      meta: {
        pagination,
      },
    };
  };

  plugin.controllers.auth.callback = async (ctx) => {
    const provider = ctx.params.provider || "local";
    const params = ctx.request.body;

    const store = strapi.store({ type: "plugin", name: "users-permissions" });
    const grantSettings = await store.get({ key: "grant" });

    const grantProvider = provider === "local" ? "email" : provider;

    if (!_.get(grantSettings, [grantProvider, "enabled"])) {
      throw new ApplicationError(ERROR_PROVIDER);
    }

    if (provider === "local") {
      await validateCallbackBody(params, undefined);

      const { identifier } = params;

      // Check if the user exists.
      const user = await strapi.query(USER_ROUTE).findOne({
        where: {
          provider,
          $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        },
        populate: {
          role: true,
          sale: true,
          banks: true,
        },
      });

      if (!user) {
        throw new ValidationError(ERROR_VALIDATION);
      }

      if (!user.password) {
        throw new ValidationError(ERROR_VALIDATION);
      }

      const validPassword = await getService("user").validatePassword(
        params.password,
        user.password,
      );

      if (!validPassword) {
        throw new ValidationError(ERROR_VALIDATION);
      }

      const advancedSettings = await store.get({ key: "advanced" });
      const requiresConfirmation = _.get(
        advancedSettings,
        "email_confirmation",
      );

      if (requiresConfirmation && user.confirmed !== true) {
        throw new ApplicationError(ERROR_EMAIL_CONFIRMED);
      }

      if (user.blocked === true) {
        throw new ApplicationError(ERROR_ACCOUNT_BLOCKED);
      }

      return ctx.send({
        jwt: getService("jwt").issue({ id: user.id }),
        user: sanitizeOutput(user, [
          "password",
          "resetPasswordToken",
          "confirmationToken",
        ]),
      });
    }
  };

  plugin.controllers.user.create = async (ctx) => {
    const advanced = await strapi
      .store({ type: "plugin", name: "users-permissions", key: "advanced" })
      .get();

    await validateCreateUserBody(ctx.request.body, undefined);

    const { email, username, role } = ctx.request.body;

    const userWithSameUsername = await strapi
      .query(USER_ROUTE)
      .findOne({ where: { username } });

    if (userWithSameUsername) {
      if (!email) throw new ApplicationError(ERROR_ALREADY_EXISTS_USERNAME);
    }

    if (advanced.unique_email) {
      const userWithSameEmail = await strapi
        .query(USER_ROUTE)
        .findOne({ where: { email: email.toLowerCase() } });

      if (userWithSameEmail) {
        throw new ApplicationError(ERROR_ALREADY_EXISTS_EMAIL);
      }
    }

    if (containsSpecialCharacters(username)) {
      throw new ApplicationError(ERROR_SPECIAL_CHARACTER_USERNAME);
    }

    const user = {
      ...ctx.request.body,
      username: username.trim(),
      email: email.toLowerCase().trim(),
      provider: "local",
    };

    if (!role) {
      const defaultRole = await strapi
        .query(USER_ROLE_ROUTE)
        .findOne({ where: { type: advanced.default_role } });

      user.role = defaultRole.id;
    }

    try {
      const data = await getService("user").add(user);
      const schema = strapi.getModel(USER_ROUTE);
      const { auth } = ctx.state;
      const sanitizedData = await sanitize.contentAPI.output(data, schema, {
        auth,
      });
      ctx.created(sanitizedData);
    } catch (error) {
      throw new ApplicationError(error.message);
    }
  };
  return plugin;
};
