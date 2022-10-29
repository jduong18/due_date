import React, { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CreateEvent from "./CreateEvent.jsx";
import EventCard from "./EventCard.jsx"
import * as serverCalls from "../apiCalls.js";
import { optionGroupUnstyledClasses } from "@mui/base";



function App(){

    
    const [cards,setCards] = React.useState([]);

    useEffect(()=>{
        serverCalls.getFromServer(setCards);
    }, [cards])

    
    function addCard(inputCard){

        serverCalls.postToServer(inputCard)
        serverCalls.getFromServer(setCards)

    }


    function removeCard(idToDelete){

        serverCalls.removeFromServer(idToDelete);
        
        setCards(previous=>{
            return previous.filter((item,index)=>{
                return item._id !== idToDelete
            })
        })
    }





    useEffect(()=>{
        let sortingCards = cards;

        let tempCards = sortingCards.sort((a,b)=>{
            return new Date (b.eventTime) - new Date(a.eventTime);
        })
        setCards(tempCards)
    },[cards])









    return(
        <div>
            <Header />
            <CreateEvent inputNewEvent = {addCard}/>
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


export default App;