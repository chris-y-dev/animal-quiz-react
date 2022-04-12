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
    });
  }, [])

  function handleAnswer(value){
    const newIndex = currentIndex + 1

    //Check answer
    if (value===questions[currentIndex].correct_answer){
      setScore(score + 1);
      console.log('CORRECT');
    } else {
      console.log('WRONG');
    }

    //Handle index and questions
    if (newIndex >= questions.length){
      setGameEnded(true);
    } else {
      setCurrentIndex(newIndex);
    }
    console.log(score, currentIndex);
  }

  return gameEnded? (
    <Score score={score}/>
  ) : (
    questions.length>0?(
      <div>
        <h1>My React Quiz</h1>
        <Question data={questions[currentIndex]} />
        <Answers data={questions[currentIndex]} onChoose={handleAnswer}/>
      </div>
    ) : (
      <div>
        <h1>Quiz Loading...</h1>
      </div>
    )
  )
}

export default App;
