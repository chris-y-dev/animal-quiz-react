import React from 'react';

function Score(props){

    return (
        <div className="score-body">
            <h1 className="headers">Your score was:</h1>
            <h1 className="headers">{props.score}</h1>
        </div>
    )
}
export default Score