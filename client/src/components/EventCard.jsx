import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function EventCard(props){



    const [time, setTime] = React.useState(Date.now());

    React.useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);



    let timeRemaining = (props.content - new Date())/(1000);

    let minutes = Math.floor((timeRemaining/60)%60);

    let hours = Math.floor(timeRemaining/(60*60));




    return(
        <div className="note">
            <h1>{props.title}</h1>
             <p>{hours + " hours " + minutes + " minutes left "}</p>
            <button onClick={()=>props.deleteCard(props.id)}>
                <DeleteIcon />
            </button>
        </div>
    )
}


export default EventCard;