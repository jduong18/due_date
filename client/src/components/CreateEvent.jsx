// import { PropaneSharp, SkipPrevious } from "@mui/icons-material";
import React from "react";
import DatePicker from "./DatePicker";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';




function CreateEvent(props){

    const [isExpanded, setExpand] = React.useState(false);



    const [event, setEvent] = React.useState({
        eventName: "",
        eventTime: new Date()
    });




    function expand(){
        setExpand(true);
    }

    function collapse(){
        setExpand(false);
    }


    function selectDate(dateString){
        setEvent({
            eventName: event.eventName,
            eventTime: dateString
        });
    }

    function updateEventName(e){
        const {value}  = e.target
        setEvent({
            eventName: value,
            eventTime: event.eventTime
        })

        
    }

    function submitNewNote(e){
        if (event.eventName === ""){
            alert("Please put a title");
        }
        else{
            props.inputNewEvent(event);
            setEvent({
                eventName: "",
                eventTime: new Date()
            });
            collapse();
            e.preventDefault();
        }



    }

    return(
        <div>
            <form className="create-note">
                <input name="title" onClick={expand} onChange = {updateEventName} value = {event.eventName} placeholder="Title"></input>
                <input name="date" type="hidden" value={event.eventTime}></input>
            
   
              

                {/* TO-DO: remove repetitive double zoom component */}
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNewNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
       

                <Zoom in={isExpanded}>
                    <button type="button" onClick={collapse} id="remove-button"><RemoveIcon /></button>
                </Zoom>

            </form>


            <div className="input-calendar">
                {isExpanded && (
                    <DatePicker  dateSelection={()=>selectDate}/>
                )}
            </div>
        </div>
        
    )
}



export default CreateEvent