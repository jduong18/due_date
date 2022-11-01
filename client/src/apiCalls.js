//Files containing calls to the api
//Include get, post, delete 
//Uses fetch 




//Get request
//PARAM: function() [function should set the setter of a hook state] 
function getFromServer(setState){
    //Fetches from server and sets hook state defined by parameter to data recieved
    fetch("http://localhost:5000/api").then(
        response => response.json(
        ).then(
            data => {
                setState(data.events)
            }
        )
    )
}



//Post request
//PARAM: JSON object
function postToServer(postObject){
    //Posts to server and logs result
    fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObject),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}   


//Delete request
//PARAM: string
function removeFromServer(idToRemove){
    //Sends 'delete' request to server with additional path param
    //Logs result of request
    fetch(("http://localhost:5000/api/"+idToRemove),{
        method: 'DELETE',
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log("Succesfully Deleted")
    })
    .catch(err=>{
        console.error(err)
    })
}





//Export the functions
export {getFromServer,postToServer,removeFromServer}