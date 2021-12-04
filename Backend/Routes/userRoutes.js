const express = require("express");
const userController=require('../Controller/UserController');
const userRouter=express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended: false}));



userRouter.post('/create',userController.createUser);

userRouter.post('/search',userController.userSearchFlights);

userRouter.get('/:email',userController.findUser);

userRouter.put('/confirm_reservation',userController.addReservation);

userRouter.delete('/delete_reservation',userController.cancelReservedFlight);

userRouter.put('edit_user/:id', userController.updateExistingUser);


module.exports=userRouter;
