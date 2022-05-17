import React, {useEffect} from 'react';

function Score({finalScore, loggedInUserData}){
    
    //post data to update database
    async function updateScore(score, username){
        try{
            const newScore = loggedInUserData.score + score;
            const updateData = {username: username, score: newScore}
            const response = await fetch('/saveScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            })  
            const fetchresponse = await response.json()
            console.log(fetchresponse);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        console.log('Score posted');
        //update database on load
        updateScore(finalScore, loggedInUserData.username)
    },[])

    return (
        <div className="score-body">
            <h1 className="headers">Your score was: {finalScore}</h1>
        </div>
    )
}
export default Score