import React, {useState, useEffect} from "react";
import Question from "./components/Question";
import Answers from "./components/Answers";
import Score from "./components/Score"; 

const API_URL = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(()=>{
    fetch(API_URL)
    .then(res => res.json())
    .then((data) => {
      setQuestions(data.results);
    })
  }, [])


  //adding a new key/value property - Shuffled Answers

  function handleAnswer(value){
    const newIndex = currentIndex + 1

    //Check answer + set score
    if (value===questions[currentIndex].correct_answer){
      setScore(score + 1);
      console.log('CORRECT');
    } else {
      console.log('WRONG');
    }

    //Make new question wait before rendering
    setTimeout(()=>{
    //Render question VS final page?
      if (newIndex >= questions.length){
        setGameEnded(true);
      } else {
        setCurrentIndex(newIndex);
      }
      console.log(score, currentIndex);
    }, 2000)
  }

  function shuffleArray(array){
    for (let i = array.length-1; i>0; i--){
        const newi = Math.floor(Math.random() * (i+1));
        [array[i], array[newi]] = [array[newi], array[i]];
    }
    console.log(`post shuffle ${array}`);
    return array;
}

  return gameEnded? (
    <Score score={score}/>
  ) : (
    questions.length>0?(
      <div className="quizbody">
        <h1>My React Quiz</h1>
        <Question data={questions[currentIndex]} />
        <Answers onChoose={handleAnswer} data={questions[currentIndex]} />
      </div>
    ) : (
      <div>
        <h1>Quiz Loading...</h1>
      </div>
    )
  )
}

export default App;
