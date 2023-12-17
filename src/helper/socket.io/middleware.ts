import { getUpServices, sendMessageToSocket } from "./helper";

export const handshake = (socket, next) => {
  console.log("socket:", socket.handshake);
  if (socket.handshake.auth && socket.handshake.auth.token) {
    const upsServices = getUpServices(strapi);
    upsServices.jwt
      .verify(socket.handshake.auth.token)
      .then((user) => {
        console.log("verify token ok", user);
        sendMessageToSocket(socket, "verify token ok");
        upsServices.user
          .fetchAuthenticatedUser(user.id)
          .then((u) => {
            try {
              console.log("join room: ", u?.id);
              socket.join(u?.id);
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            sendMessageToSocket(socket, err.message);
            socket.disconnect();
          });
      })
      .catch((err) => {
        sendMessageToSocket(socket, err.message);
        socket.disconnect();
      });
  } else {
    sendMessageToSocket(socket, "No token given.");
    socket.disconnect();
  }
  next();
};
