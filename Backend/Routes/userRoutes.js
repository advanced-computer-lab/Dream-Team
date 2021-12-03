const express = require("express");
const userController=require('../Controller/UserController');
const userRouter=express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended: false}));



userRouter.post('/create',userController.createUser);

userRouter.post('/search',userController.userSearchFlights);

userRouter.get('/:email',userController.findUser);

// flightRouter.put('/update/:id',userController.updateFlight);

// flightRouter.delete('/delete/:id',userController.deleteFlight);

// flightRouter.post('/create',userController.createFlight);

module.exports=userRouter;
