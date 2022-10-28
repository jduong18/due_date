import React, { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CreateEvent from "./CreateEvent.jsx";
import EventCard from "./EventCard.jsx"


function App(){

    
    const [cards,setCards] = React.useState([]);




    function grabFromAPI(){
        fetch("http://localhost:5000/api").then(
            response => response.json(
            ).then(
                data => {
                    setCards(data.events)
                }
            )
        )
    }

    useEffect(()=>{
        grabFromAPI();
    }, [cards])








    
    function addCard(inputCard){


        fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputCard),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


        grabFromAPI();

        // setCards(previous=>{
        //     return[...previous,inputCard];
        // });
    }


    function removeCard(idToDelete){

        fetch(("http://localhost:5000/api/"+idToDelete),{
            method: 'DELETE',
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log("Succesfully Deleted")
        })
        .catch(err=>{
            console.error(err)
        })





        setCards(previous=>{
            return previous.filter((item,index)=>{
                return item._id !== idToDelete
            })
        })
    }



    function showCards(){
        
    }

    return(
        <div>
            <Header />
            <CreateEvent inputNewEvent = {addCard}/>

            {cards.map((item)=>(
                <EventCard 
                    key= {item._id}
                    id= {item._id}
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