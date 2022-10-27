import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



function DatePicker(props){
    const [value, onChange] = React.useState(new Date());


    return (
      <div>
        <Calendar onChange={onChange} onClickDay={props.dateSelection(value)} value={value} minDate={new Date()}/>
      </div>
    );


}


export default DatePicker;