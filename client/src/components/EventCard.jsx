//import modules
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

//Function to create each individual card component
//Prop contains: id=key, title, content, deleteCard()
//
function EventCard(props){

    //5 second constant for interval 
    const INTERVAL_MS = 5000;


    //Interval for re-rendering component
    // Returns an unmount function to clear interval to prevent memory leaks.
    React.useEffect(() => {
    const interval = setInterval(() => {
        console.log('Logs every minute');
    }, INTERVAL_MS);
    return () => clearInterval(interval); 
    }, [])


    //Calculate seconds remaining based on time from props and current date
    let timeRemaining = (props.content - new Date())/(1000);
    //Convert to minutes and hours
    let minutes = Math.floor((timeRemaining/60)%60);
    let hours = Math.floor(timeRemaining/(60*60));


    //Set string for CSS classes based on amount of time reamining
    //Intervals are set as:
        //7 days
        //Between 3 and 7 days
        //Between 1 and 3 days
        //Between 0 and 1 day
        //Past the date

    let stressLevel = ""
    if (timeRemaining >= 604800){
        stressLevel = "relax status-bar";
    }
    else if(timeRemaining >= 259200 && timeRemaining < 604800){
        stressLevel = "caution status-bar";
    }
    else if(timeRemaining > 86400 && timeRemaining < 259200){
        stressLevel = "alert status-bar";
    }
    else if(timeRemaining > 0 && timeRemaining < 86400){
        stressLevel = "panic status-bar";
    }
    else{
        stressLevel= "overdue status-bar";
        minutes = 0;
        hours = 0;
    }




    //Return component
    //Button calls delete function which uses id, both from prop
    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p>{hours + " hours " + minutes + " minutes left "}</p>
            <div className={stressLevel}></div>
            <button onClick={()=>props.deleteCard(props.id)}>
                <DeleteIcon />
            </button>
        </div>
    )
}

//export component
export default EventCard;