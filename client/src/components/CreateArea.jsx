import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props){

    const [isExpanded, setExpanded] = React.useState(false);


    const [note, setNote] = React.useState({
        title:"",
        content:"",
    });

    function handleChange(event){
        const {name, value} = event.target
        setNote(previous=>{
            return({
                ...previous,
                [name]:value
            })
        });
    }

    function submitNote(event){
        props.inputNewNote(note)
        setNote({
            title:"",
            content:""
        });
        event.preventDefault();  
    }

    function expand(){
        setExpanded(true);
    }


    return(
        <div>
            <form className="create-note">
                {isExpanded && (
                    <input name="title" onChange={handleChange} value={note.title} placeholder="Title"></input>
                )}
                
                <textarea name="content" onClick={expand} onChange= {handleChange} value={note.content} rows={isExpanded? 3:1} placeholder="Take a note..."></textarea>
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                 </Zoom>
            </form>
            

        </div>
    )
}


export default CreateArea;