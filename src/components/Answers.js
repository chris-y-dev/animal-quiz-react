import React, {useEffect} from 'react';

function Answers({handleClick, data, onChoose}){
    console.log(data);
    const correct_answer = data.correct_answer;
    const incorrect_answers = data.incorrect_answers 
    const array = [correct_answer, ...incorrect_answers];
    console.log(`preshuffle ${array}`);

    //function to RANDOMIZE question order
    function shuffleArray(array){
        for (let i = array.length-1; i>0; i--){
            const newi = Math.floor(Math.random() * (i+1));
            [array[i], array[newi]] = [array[newi], array[i]];
        }
        console.log(`post shuffle ${array}`);
        return array;
    }

    shuffleArray(array);
    console.log(array);

    function handleClick(event){
        onChoose(event.target.value);
    }


    return (
        <div>
        {array.map(function(choice, index){
            return <button dangerouslySetInnerHTML={{__html: choice}} onClick={handleClick} key={index} id={index} value={choice}/>
        })}
        </div>

    )
}

export default Answers

{/* <button dangerouslySetInnerHTML={{__html: incorrect_answers[0]}} onClick={handleClick}/>
<button dangerouslySetInnerHTML={{__html: incorrect_answers[1]}} onClick={handleClick}/>
<button dangerouslySetInnerHTML={{__html: incorrect_answers[2]}} onClick={handleClick}/>
<button dangerouslySetInnerHTML={{__html: correct_answer}} onClick={handleClick}/> */}