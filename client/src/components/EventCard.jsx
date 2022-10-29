import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Zoom } from "@mui/material";

function EventCard(props){



    // const [time, setTime] = React.useState(Date.now());

    // React.useEffect(() => {
    //     const interval = setInterval(() => setTime(Date.now()), 1000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);



    const MINUTE_MS = 5000;

    React.useEffect(() => {
    const interval = setInterval(() => {
        console.log('Logs every minute');
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])



    let timeRemaining = (props.content - new Date())/(1000);

    let minutes = Math.floor((timeRemaining/60)%60);

    let hours = Math.floor(timeRemaining/(60*60));



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

    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p>{hours + " hours " + minutes + " minutes left "}</p>
            <div className={stressLevel}>

            </div>
            <button onClick={()=>props.deleteCard(props.id)}>
                <DeleteIcon />
            </button>
        </div>
    )
}

export default EventCard;