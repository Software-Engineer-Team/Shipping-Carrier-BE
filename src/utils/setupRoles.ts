import _ from "lodash";
import { USER_PERMISSION_ROUTE, USER_ROLE_ROUTE } from "../helper/constants";
import { ROLE } from "../helper/apiHelper";

const injectPluginName = (route, pluginName) => {
  route["plugin"] = pluginName;
  return route;
};

export async function initializeRoles(strapi) {
  // define roles on the first to be reusable
  // by script and functions
  const roles = {};

  // define the permissions who will
  // be enabled by default if it nos
  // specified on routes
  const DEFAULT_ENABLED_PERMISSIONS = [
    "customer.plugin.users-permissions::auth.callback",
    "customer.plugin.users-permissions::auth.connect",
    "customer.plugin.users-permissions::auth.emailConfirmation",
    "customer.plugin.users-permissions::auth.forgotPassword",
    "customer.plugin.users-permissions::auth.changePassword",
    "customer.plugin.users-permissions::auth.resetPassword",
    "customer.plugin.users-permissions::auth.sendEmailConfirmation",
    "customer.plugin.users-permissions::user.me",
    "sale.plugin.users-permissions::auth.callback",
    "sale.plugin.users-permissions::auth.connect",
    "sale.plugin.users-permissions::auth.emailConfirmation",
    "sale.plugin.users-permissions::auth.forgotPassword",
    "sale.plugin.users-permissions::auth.changePassword",
    "sale.plugin.users-permissions::auth.resetPassword",
    "sale.plugin.users-permissions::auth.sendEmailConfirmation",
    "sale.plugin.users-permissions::user.me",
    "sale.plugin.users-permissions::user.find",
    "sale.plugin.users-permissions::user.findOne",
    "sale.plugin.users-permissions::user.create",
    "customer_care.plugin.users-permissions::auth.callback",
    "customer_care.plugin.users-permissions::auth.connect",
    "customer_care.plugin.users-permissions::auth.emailConfirmation",
    "customer_care.plugin.users-permissions::auth.forgotPassword",
    "customer_care.plugin.users-permissions::auth.changePassword",
    "customer_care.plugin.users-permissions::auth.resetPassword",
    "customer_care.plugin.users-permissions::auth.sendEmailConfirmation",
    "customer_care.plugin.users-permissions::user.me",
    "customer_care.plugin.users-permissions::user.find",
    "customer_care.plugin.users-permissions::user.findOne",
    "customer_care.plugin.users-permissions::user.create",
    "public.plugin.users-permissions::user.create",
  ];

  const configureRole = async (target_role) => {
    // check if role already was registered on 'roles' variable
    // console.log("target_role", target_role);
    if (Object.keys(roles).includes(target_role)) return;
    // check if role exists on database
    const role = await strapi
      .query(USER_ROLE_ROUTE)
      .findOne({ where: { type: target_role } });
    // create the role if it does not exists
    if (!role) {
      console.log("generating new role::", target_role);
      await strapi.query(USER_ROLE_ROUTE).create({
        data: {
          name: target_role.charAt(0).toUpperCase() + target_role.slice(1),
          description: `Default role given to ${target_role} user.`,
          type: target_role,
        },
      });
    }
  };

  const manageRole = async (type, plugin, controller, action) => {
    const path = `${type}.${plugin}.${controller}`;
    _.set(roles, path, [..._.get(roles, path, []), action]);
  };

  try {
    // Update specified default permissions enabled = true
    for (const permission of DEFAULT_ENABLED_PERMISSIONS) {
      const [type, plugin, controller, action] = permission.split(".");
      await configureRole(type);
      await manageRole(type, plugin, controller, action);
    }
  } catch (error) {
    console.log(error);
  }

  // Build route authentication role based on route 'config.permission' attribute
  // if it does not contains 'config.permission' assume Forbidden Access
  let routesSrcApi = [];

  _.forEach(strapi.api, ({ routes }) => {
    _.forEach(routes, (route: any) => {
      routesSrcApi = [
        ...routesSrcApi,
        ..._.get(route, "routes", []).map((r: any) =>
          injectPluginName(r, "api"),
        ),
      ];
    });
  });

  _.forEach(_.get(strapi, "plugins", []), (plugin: any, pluginName: any) => {
    if (plugin.routes["content-api"]) {
      const pluginRoutes = _.get(
        plugin.routes["content-api"],
        "routes",
        [],
      ).map((route: any) => injectPluginName(route, "plugin"));
      routesSrcApi.push(...pluginRoutes);
    }
  });

  for (const route of routesSrcApi) {
    let [controller, action] = _.get(route, "handler").split(".");

    if (
      _.get(route, "config.roles") ||
      _.get(route, "config.permission") ||
      _.get(route, "plugin")
    ) {
      // treat for permission target to multi or single roles
      let target_roles = [];
      const config_roles = _.get(
        route,
        "config.roles",
        _.get(route, "config.permission"),
      );
      if (_.isString(config_roles)) target_roles = [config_roles.toLowerCase()];
      else if (_.isArray(config_roles))
        target_roles = config_roles.map((i) => i.toLowerCase());
      else if (_.get(route, "plugin") === "plugin") {
        target_roles = [ROLE.ADMIN].map((i) => i.toLowerCase());
      }
      // attatch permission to target roles
      controller = `${route.info.apiName || route.info.pluginName
        }::${controller}`;
      for (const target_role of target_roles) {
        // configure role
        await configureRole(target_role);
        // create path for controller permission and attach to roles
        await manageRole(
          target_role,
          _.get(route, "plugin"),
          controller,
          action,
        );
      }
    }
  }

  // ********************************************************* //
  // Allow specific authenticated routes for users-permissions //
  // ********************************************************* //
  for (const roleType in roles) {
    const role = await strapi
      .query(USER_ROLE_ROUTE)
      .findOne({ where: { type: roleType } });
    if (role) {
      // iterate plugins
      for (const plugin in roles[role.type]) {
        // re-create role for each plugin
        for (const controller in roles[role.type][plugin]) {
          for (const action of roles[role.type][plugin][controller]) {
            const payloadId = {
              action: `${plugin}::${controller.replace("::", ".")}.${action}`,
              role: role.id,
            };
            const permission = await strapi
              .query(USER_PERMISSION_ROUTE)
              .findOne({
                where: {
                  ...payloadId,
                },
                populate: { role: true },
              });
            if (permission) {
              // await strapi.query(USER_PERMISSION_ROUTE).update({
              //   where: { id: permission.id },
              //   data: { enabled: true },
              // });
              // console.log(
              //   `updating permission ::: ${role.type
              //   }.${plugin}.${controller.replace("::", ".")}.${action} ::: ID=${permission.id
              //   }`
              // );
            } else {
              const pId = await strapi
                .query(USER_PERMISSION_ROUTE)
                .create({ data: { ...payloadId, enabled: true } });
              console.log(
                `generating permission ::: ${role.type
                }.${plugin}.${controller.replace("::", ".")}.${action} ::: ID=${pId.id
                }`,
              );
            }
          }
        }
      }
    }
  }
}
