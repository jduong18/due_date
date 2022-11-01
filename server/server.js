//Require modules needed
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


//Set up
const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());



//Connect to server DB
//Connects to dueDateDB
mongoose.connect("mongodb://localhost:27017/dueDateDB")





//Create Schema for document
const eventSchema = mongoose.Schema({
    eventName:{
        type: String,
        required: [true, "No name specified"]
    },
    eventTime:{
        type: String,
        required: [true, "No date specified"]
    }
})


//Create event using schema
const EventModel = mongoose.model("Event", eventSchema);



//Get route to api
app.get("/api",(req,res) => {
    let result = []
    //Returns every document inside the database
    EventModel.find((err, events) =>{
        if(err){
            console.log(err);
        }
        else{
            res.json({"events":events})
        }
    });

})


//Post route to api
app.post("/api",(req,res)=>{
    //Create new event object based on post request
    const newEvent = new EventModel({
        eventName: req.body.eventName,
        eventTime: req.body.eventTime
    });

    //Save to database
    newEvent.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Success");
        }
    });


    res.send(req.body);
})


//Delete route to remove items from database
app.delete("/api/:idToDelete",(req,res)=>{
    //Delete based on id sent by client request
    EventModel.deleteOne({_id: req.params.idToDelete},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted inside server")
        }
    })
})





//Server listens to port 5000
app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})

