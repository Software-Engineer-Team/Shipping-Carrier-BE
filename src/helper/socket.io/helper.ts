export const sendDataBuilder = (identity, entity) => {
  return Array.isArray(entity)
    ? JSON.stringify({ identity: identity.toLowerCase(), entity })
    : JSON.stringify({ identity: identity.toLowerCase(), ...entity });
};

export const getUpServices = (strapi) =>
  strapi.plugins["users-permissions"].services;

export const sendMessageToSocket = (socket, message) => {
  socket.emit("message", message);
};
