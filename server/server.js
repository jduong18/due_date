const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/dueDateDB")






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



const EventModel = mongoose.model("Event", eventSchema);





























app.get("/api",(req,res) => {
    EventModel.find((err, events) =>{
        if(err){
            console.log(err);
        }
        else{
            res.json({"events":events})
        }
    })

;
})



app.post("/api",(req,res)=>{
    const newEvent = new EventModel({
        eventName: req.body.eventName,
        eventTime: req.body.eventTime
    });


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



app.delete("/api/:idToDelete",(req,res)=>{
    EventModel.deleteOne({_id: req.params.idToDelete},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted inside server")
        }
    })
})










app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})

