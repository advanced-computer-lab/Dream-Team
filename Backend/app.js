const express=require('express');
const app =express();
require('dotenv').config();
const flightRouter=require('./routes/flightRoutes');
const User=require('./model/user.js');


const mongoose=require('mongoose');
const cors = require('cors');
const dbPath = "mongodb+srv://watidy:dreamteam@cluster0.nso6g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;

mongoose.connect(dbPath).then((result)=>console.log('connected to DB'))
.catch((err)=>console.log(err));

app.use(cors());
app.use('/flights',flightRouter)

app.post('/createUser',(req,res)=>
{
    const user=new User(
        {
            Name : 'Watidy',
            Admin: true
            /*Email: req.body.Email,
            Age : req.body.Age,
            BornIn:req.body.BornIn,
            LivesIn: req.body.LivesIn,
            MartialStatus:req.body.MartialStatus,
            PhoneNumber: req.body.PhoneNumber,
            Job:req.body.Job*/

        }
    );
    user.save().then((result)=>{
        res.send(result);
    }).catch((err)=>
    {
        res.status(400).send("Address is needed");
    });
});

app.listen(8000);
console.log("Back-end Listening on port 8000");


