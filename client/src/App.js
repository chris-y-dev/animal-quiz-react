import React, {useState, useEffect} from "react";
import Question from "./components/Question";
import Answers from "./components/Answers";
import Score from "./components/Score"; 
import Login from "./components/Login"
import Leaderboard from "./components/Leaderboard";
import SignUp from "./components/Signup";
import StartPage from "./components/StartPage";

const API_URL = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUserData, setLoggedInUserData]= useState({})

  useEffect(()=>{
    fetch(API_URL)
    .then(res => res.json())
    .then((data) => {
      setQuestions(data.results);
    })
  }, [])

  // function to RANDOMIZE question order
  function shuffleArray(array){
    for (let i = array.length-1; i>0; i--){
        const newi = Math.floor(Math.random() * (i+1));
        [array[i], array[newi]] = [array[newi], array[i]];
    }
    console.log(`after shuffle: ${array}`);
    return array;
}

  //fetch function to save data online


  function handleAnswer(value){
    const newIndex = currentIndex + 1

    setTimeout(()=>{
    //Check answer + set score
    if (value===questions[currentIndex].correct_answer){
      setScore(score + 1);
      console.log('CORRECT');
    } else {
      console.log('WRONG');
    }

    //Make new question wait before rendering
    //Render question VS final page?
      if (newIndex >= questions.length){
        setGameEnded(true);
      } else {
        setCurrentIndex(newIndex);
      }
      console.log(score, currentIndex);
    }, 1200)
  }

  function handleLogin(){
    // console.log(loginData.username, loginData.password);
    setLoggedIn(true)
  }

  function handleSignup(signupData){
    console.log('signup clicked');
  }

  function getUserData(user){
    setLoggedInUserData(user)
    console.log(user);
  }

  function restartQuiz(){
    document.location.href="/";
   
  }

  //<Login handleLogin={handleLogin}/>

  return loggedIn?(
    gameEnded? (
        <div>
          <Score finalScore={score} loggedInUserData={loggedInUserData}/>
          <Leaderboard restartQuiz={restartQuiz} />
        </div>
      ) : (
          questions.length>0?(
              <div className="quizbody">
                <h1>My React Quiz</h1>
                <Question data={questions[currentIndex]} />
                <Answers onChoose={handleAnswer} data={questions[currentIndex]} shuffledArray={shuffleArray([questions[currentIndex].correct_answer, ...questions[currentIndex].incorrect_answers])} />
              </div>
            ) : (
                <div>
                  <h1 className="headers">Quiz Loading...</h1>
                </div>
              )
            )
  ) : (
    <StartPage handleLogin={handleLogin} handleSignup={handleSignup} getUserData={getUserData}/>
  )
}

export default App;
