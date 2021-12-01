const express = require("express");
const userController=require('../Controller/UserController');
const userRouter=express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended: false}));



// flightRouter.get('/',userController.listFlights);

userRouter.post('/search',userController.userSearchFlights);

// flightRouter.get('/:id',userController.showFlight);

// flightRouter.put('/update/:id',userController.updateFlight);

// flightRouter.delete('/delete/:id',userController.deleteFlight);

// flightRouter.post('/create',userController.createFlight);

module.exports=userRouter;
