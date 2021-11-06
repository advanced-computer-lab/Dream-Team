const express = require("express");
const userController=require('../Controller/UserController');
const flightRouter=express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: false}));



flightRouter.get('/',userController.listFlights);

flightRouter.put('/update/:id',userController.updateFlight);

flightRouter.delete('/delete/:id',userController.deleteFlight);

flightRouter.post('/create',userController.createFlight);

module.exports=flightRouter;