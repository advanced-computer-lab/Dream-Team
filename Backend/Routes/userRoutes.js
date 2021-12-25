const express = require("express");
const userController = require("../Controller/UserController");
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));

userRouter.post("/create", userController.createUser);

userRouter.post("/login", userController.loginPipeline, async (req, res) => {
  res.status(200).json({
    message: "Logged in successfully",
    typeOfUser: req.typeOfUser,
    token: req.token,
    user: req.user,
  });
});

userRouter.put(
  "/reset-password",
  userController.resetPasswordPipeline,
  (req, res) => {
    res.status(200).json({
      message: "Password updated successfully",
      user: req.user,
    });
  }
);

userRouter.post("/search", userController.userSearchFlights);
userRouter.get("/:email", userController.findUser);
userRouter.put("/confirm_reservation", userController.addReservation);
userRouter.put("/edit_reservation", userController.editReservation);
userRouter.put(
  "/delete_reservation/:email/:id",
  userController.cancelReservation
);

userRouter.put("/edit_user/:email", userController.updateExistingUser);

userRouter.post("/send_confirmation", userController.sendConfirmation);
userRouter.post("/send_itenerary", userController.sendItenerary);
userRouter.post("/send_confirmation_reservation", userController.sendConfirmationReservation);
userRouter.put("/edit_seats", userController.editSeats);

module.exports = userRouter;
