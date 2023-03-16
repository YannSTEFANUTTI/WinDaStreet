const express = require("express");
const UsersController = require("../controllers/UsersController");
const {
  verifyPassword,
  checkByJoi,
  hashPassword,
} = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/logout", UsersController.logout);
userRouter.get("/:id", UsersController.getOneUser);
userRouter.get("/", UsersController.getAllUsers);
userRouter.get("/notfriend/:id", UsersController.getUserNotFriend);
userRouter.post("/login", UsersController.login, verifyPassword);
userRouter.post("/", checkByJoi, hashPassword, UsersController.postUser);
userRouter.put("/:id", UsersController.updateOneUser);
userRouter.delete("/:id", UsersController.deleteUser);

module.exports = userRouter;
