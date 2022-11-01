//import modules and components
import React, { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CreateEvent from "./CreateEvent.jsx";
import EventCard from "./EventCard.jsx"
import * as serverCalls from "../apiCalls.js";



//Function to run the app using components built
function App(){

    //State holding list of cards
    const [cards,setCards] = React.useState([]);

    //Gets data from server when card state changes
    useEffect(()=>{
        serverCalls.getFromServer(setCards);
    }, [cards])

    
    //Function to add a card 
    //Params: Object({ string, string(dateObject) })
    function addCard(inputCard){
        //Send new card to server
        serverCalls.postToServer(inputCard)
        //Get all cards from server
        serverCalls.getFromServer(setCards)
    }


    //Function to remove a card
    //Param: String
    function removeCard(idToDelete){
        //Remove card from server
        serverCalls.removeFromServer(idToDelete);
        //Remove call from cards list state
        setCards(previous=>{
            return previous.filter((item,index)=>{
                return item._id !== idToDelete
            })
        })
    }

    //Return components
    return(
        <div>
            <Header />
            <CreateEvent inputNewEvent = {addCard}/>
            {/* Sort the cards by date in ascending order, the smallest time eventTime (time remaining), will be first */}
            {cards.sort((a,b)=>{return new Date (a.eventTime) - new Date (b.eventTime)}).map((item)=>(
                <EventCard 
                    key = {item._id}
                    id = {item._id}
                    title =  {item.eventName}
                    content = {new Date(item.eventTime)}
                    deleteCard = {removeCard}
                />
            ))}
            <Footer />
        </div>
    );
}

//export app
export default App;