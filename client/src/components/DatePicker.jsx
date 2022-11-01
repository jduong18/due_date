//import modules
import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


//Create calendar component for users to pick a date
//Prop contains: dateSelection()
function DatePicker(props){
    const [value, onChange] = React.useState(new Date());

    //Return component
    //Value state changes 'onChange', clicking on a day calls dateSelection which changes state in parent component
    //Minimum date is set to current date + 1 day (tomorrow)
    return (
      <div>
        <Calendar onChange={onChange} onClickDay={props.dateSelection(value)} value={value} minDate={new Date(new Date().getTime()+1000*60*60*24)}/>
      </div>
    );


}

//export component
export default DatePicker;