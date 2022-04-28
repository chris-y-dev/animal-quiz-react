import React, {useEffect} from "react";

function Leaderboard({restartQuiz}){
    const scoreArray = [
        {
            username: 1,
            score: 5
        },
        {
            username: 2,
            score: 5
        },
        {
            username: 3,
            score: 5
        },
        {
            username: 4,
            score: 5
        },
        {
            username: 5,
            score: 5
        },
        {
            username: 6,
            score: 5
        },
        {
            username: 7,
            score: 5
        },
        {
            username: 8,
            score: 5
        },
        {
            username: 9,
            score: 5
        },
        {
            username: 10,
            score: 5
        },
        {
            username: 11,
            score: 5
        },
    ]

    useEffect(()=>{
        //Fetch API here
        console.log('Fetching data');
    }, [])

    function handleClick(){
        console.log('play again');
        restartQuiz();
    }


    return (
        <div className="leaderboard_container">
            <div className="leaderboard">
                <div className="leaderboard_row">
                    {scoreArray.map(function(user, index){
                        while(index<10){
                            return <p key={user.username}>{index+1}. Username: {user.username}, score: {user.score}</p>
                        }
                    })}
                </div>
            </div>
            <p className="button_container">
            <button type="button" className="playAgain_btn" onClick={handleClick}>Play again</button>
            </p>
        </div>
    )
}

export default Leaderboard;