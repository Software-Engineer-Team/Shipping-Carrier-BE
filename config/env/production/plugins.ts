module.exports = {
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
    },
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '1d',
      },
    },
  },
};
