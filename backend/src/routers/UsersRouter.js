const express = require("express");
const usersController = require("../controllers/usersController");
const {
  verifyPassword,
  checkByJoi,
  hashPassword,
} = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/logout", usersController.logout);
userRouter.get("/:id", usersController.getOneUser);
userRouter.get("/", usersController.getAllUsers);
userRouter.get("/notfriend/:id", usersController.getUserNotFriend);
userRouter.post("/login", usersController.login, verifyPassword);
userRouter.post("/", checkByJoi, hashPassword, usersController.postUser);
userRouter.put("/:id", usersController.updateOneUser);
userRouter.delete("/:id", usersController.deleteUser);

module.exports = userRouter;
