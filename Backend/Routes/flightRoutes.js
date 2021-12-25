const express = require("express");
const userController=require('../Controller/UserController');
const flightRouter=express.Router();


flightRouter.get('/',userController.listFlights);

flightRouter.get('/search',userController.searchFlights);

flightRouter.get('/:id',userController.showFlight);

flightRouter.put('/update/:id',userController.updateFlight);

flightRouter.delete('/delete/:id',userController.deleteFlight);

flightRouter.post('/create',userController.createFlight);

module.exports=flightRouter;
