import { handshake } from "./middleware";

const options = {
  cors: {
    origin: "*",
  },
};

export const io = require("socket.io")(strapi.server.httpServer, options);

export const StrapIOInit = () => {
  // loading middleware ordered
  io.use(handshake);

  // debugging
  if (process.env.DEBUG == "strapio" || process.env.DEBUG == "*") {
    io.on("connection", (socket) => {
      console.debug("Connected Socket:", socket.id);
      socket.on("disconnect", (reason) => {
        console.debug("Socket Disconnect:", socket.id, socket.rooms);
      });
    });
  }
};
