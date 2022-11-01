//import modules
import React from "react";
import DatePicker from "./DatePicker";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';



//Create component for input of new events
//Prop contains: inputeNewEvent()
function CreateEvent(props){
    //State to determine whether or not the user is inside creation text box
    //Expands to show calendar if true
    const [isExpanded, setExpand] = React.useState(false);


    //State containing object of event being created
    //Updates when user clicks on calendar or types
    const [event, setEvent] = React.useState({
        eventName: "",
        eventTime: new Date()
    });



    //Functions that change isExpanded state
    function expand(){
        setExpand(true);
    }
    function collapse(){
        setExpand(false);
    }



    //Function that updates the eventTime, keeps previous value of eventName
    //Params: string (date object)
    function selectDate(dateString){
        setEvent({
            eventName: event.eventName,
            eventTime: dateString
        });
    }

    //Function that updates the eventName, keeps previous value of eventTime
    //Params: keyboard event
    function updateEventName(e){
        const {value}  = e.target
        setEvent({
            eventName: value,
            eventTime: event.eventTime
        })

        
    }

    //Function that handles submission of new note within the component
    //Params: event
    function submitNewNote(e){
        //Ensures title field has been filled
        if (event.eventName === ""){
            alert("Please put a title");
        }
        else{
            //Inserts state into state of parent component (event card into a list of cards)
            props.inputNewEvent(event);
            //Reset fields
            setEvent({
                eventName: "",
                eventTime: new Date()
            });
            //Shrink input window to default
            collapse();
            //Prevent reload
            e.preventDefault();
        }



    }

    //Return component
    return(
        <div>
            <form className="create-note">
                {/* When user clicks to input for eventName, isExpanded = true, showing calendar for user to select date*/}
                <input name="title" onClick={expand} onChange = {updateEventName} value = {event.eventName} placeholder="Assignment"></input>
                <input name="date" type="hidden" value={event.eventTime}></input>
            
   
                {/* isExpanded === true, shows 2 buttons, one to submit a new note, one to cancel new submission and collapse to default */}
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNewNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
                <Zoom in={isExpanded}>
                    <button type="button" onClick={collapse} id="remove-button"><RemoveIcon /></button>
                </Zoom>
            </form>


            {/* isExpanded === true, shows calendar for date selection*/}
            <div className="input-calendar">
                {isExpanded && (
                    <DatePicker  dateSelection={()=>selectDate}/>
                )}
            </div>
        </div>
        
    )
}


//export component
export default CreateEvent