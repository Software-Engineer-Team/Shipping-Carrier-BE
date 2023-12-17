const { parseMultipartData } = require("@strapi/utils");

export const parseBody = (ctx) => {
  if (ctx.is("multipart")) {
    return parseMultipartData(ctx);
  }

  const { data } = ctx.request.body || {};

  return { data };
};

export const sanitizeOutput = (
  object: any = {},
  propertiesToOmit: string[],
) => {
  if (Array.isArray(object)) {
    return object.map((item) => {
      if (typeof item === "object" && item !== null) {
        return sanitizeOutput(item, propertiesToOmit);
      }
      return item;
    });
  }

  const sanitizedObject = {};

  for (const key in object) {
    if (!propertiesToOmit.includes(key)) {
      const value = object[key];

      if (Array.isArray(value)) {
        sanitizedObject[key] = value.map((item) => {
          if (typeof item === "object" && item !== null) {
            return sanitizeOutput(item, propertiesToOmit);
          }
          return item;
        });
      } else if (typeof value === "object" && value !== null) {
        sanitizedObject[key] = sanitizeOutput(value, propertiesToOmit);
      } else {
        sanitizedObject[key] = value;
      }
    }
  }

  return sanitizedObject;
};
