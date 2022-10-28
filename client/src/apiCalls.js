






function getFromServer(setState){
    fetch("http://localhost:5000/api").then(
        response => response.json(
        ).then(
            data => {
                setState(data.events)
            }
        )
    )
}






function postToServer(postObject){
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


function removeFromServer(idToRemove){
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






export {getFromServer,postToServer,removeFromServer}