require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const commentsController = require("./src/controllers/commentsController");
const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ` ${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  console.warn("User connected");
  socket.on("newComment", (artId) => {
    commentsController.getAllByArt({ params: artId }).then((allComments) => {
      io.emit("newComment", allComments);
    });
  });
});

server.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

io.listen(server);
