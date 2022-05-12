import React, {useEffect, useState} from "react";
import Profiles from "./Profiles";

function Leaderboard({restartQuiz}){
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(()=>{
        //Fetch API here
        fetch('/database')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setLeaderboard(data);
            })
        console.log('Fetching data');
    }, [])

    function handleClick(){
        console.log('play again');
        restartQuiz();
    }

    //Function to sort JSON by score 
    function get_top(data){
        let sort = data.sort((a, b) => {
            return b.score - a.score;
        })        
        return sort.slice(0, 10); // currently top 4
    } 



    return (
        <div className="leaderboard_container">
            <div className='leaderboard_title'>
                <h1>Leaderboard</h1>
            </div>
            <div className="leaderboard">
                <div className="leaderboard_header">
                    <p>Top 10 Users:</p>
                    <p>Accumulated score:</p>
                </div>
                <div className="leaderboard_row">
                {leaderboard && <Profiles Leaderboard={get_top(leaderboard)} />}
                </div>
            </div>
            <p className="button_container">
            <button type="button" className="playAgain_btn" onClick={handleClick}>Play again</button>
            </p>
        </div>
    )
}

export default Leaderboard;