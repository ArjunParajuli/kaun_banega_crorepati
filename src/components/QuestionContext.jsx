import React, { createContext, useEffect, useRef, useState } from 'react';
import { prizeMoney } from "../data";
import { questions } from "../data";
import useSound from "use-sound";
import gameStart from "../sounds/play.mp3";
import correctAns from "../sounds/correct.mp3";
import wrongAns from "../sounds/wrong.mp3";

const QuestionContext = createContext();

const QuestionProvider = ({children}) => {
  const [start, setStart] = useState(false); // for the enter name comp
  const [quesNum, setQuesNum] = useState(1);
  const [amountWon, setAmountWon] = useState(0);

  const [ques, setQues] = useState(null); // current question
  const [selAns, setSelAns] = useState(null); // selected answer
  const [classname, setClassname] = useState(""); // for applying background color to selected option
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [correctOptionNumber, setCorrectOptionNumber] = useState(null);
  const [options, setOptions] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });
  const [remLifelines, setRemLifelines] = useState({
    fiftyFifty: true,
    audience: true,
    flipQues: true,
  });

    // Modals
    const ref = useRef(); // for gameOverModal
    const audRef = useRef(); // for audiencePollModal

  // useSound hook
  const [gameStartSound] = useSound(gameStart);
  const [correctAnsSound] = useSound(correctAns);
  const [wrongAnsSound] = useSound(wrongAns);

  //  only play at start of application
  useEffect(() => {
    gameStartSound();
  }, [gameStartSound]);

  // set the question
  useEffect(() => {
    if (quesNum !== questions.length + 1) {
      setQues(questions[quesNum - 1].question);
    }
  }, [quesNum]);


// func to find correct option number so that it can be sent to AudiencePollModal
const findCorrectOptionNumber = (options) => {
  let keysArr = Object.keys(options); // returns array which contains the keys of the options object
  for(let index=0;index<keysArr.length;index++){
    const currKey = keysArr[index];
    if(options[currKey]?.correct === true){
      return index+1;
    }
  }
  return null;
};


  // update options when quesNum changes
  useEffect(() => {
    setOptions((prev) => {
      const newOptions = {
        ...prev,
        option1: questions[quesNum - 1]?.answers[0],
        option2: questions[quesNum - 1]?.answers[1],
        option3: questions[quesNum - 1]?.answers[2],
        option4: questions[quesNum - 1]?.answers[3],
      };

      setCorrectOptionNumber(()=>{
        return findCorrectOptionNumber(newOptions);
      })
      return newOptions;
    });
  }, [quesNum]);


  // function to handle option select
  const handleSelect = (option) => {
    setIsAnswerSelected(true); // isko true mark karo taki <Timer /> comp mai timer stop hojaye
    setSelAns(option);
    const isCorrect = option?.correct;
    setClassname(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      // answer is correct then go to next ques
      correctAnsSound();
      // after correct sound plays for 3 secs, we go to next ques
      setTimeout(() => {
        setSelAns(null); // reset selected ans for next ques
        setQuesNum((prev) => {
          return prev + 1;
        });
        setTimer(5);
        setIsAnswerSelected(false); // reset it so that timer continues in <Timer /> comp
      }, 3000);
      setAmountWon(() => {
        return parseInt(prizeMoney[quesNum - 1].amount);
      });
    } else if (!isCorrect) {
      // ans is incorrect
      wrongAnsSound();
      setTimeout(() => {
        setGameOver(true);
        ref.current.showModal();
      }, 3000);
    }
  };

  useEffect(() => {
    if (quesNum === questions.length+1) {
      setGameOver(true);
      ref.current.showModal();
    }
  }, [quesNum]);


  // function to handle 50-50
  const handleFiftyFifty = () => {
    setOptions((prev) => {
      if (prev.option1.correct || prev.option4.correct) {
        return {
          ...prev,
          option2: { ...prev.option2, text: " " }, // while updating the required property, preserve other properties
          option3: { ...prev.option3, text: " " },
        };
      } else {
        return {
          ...prev,
          option1: { ...prev.option1, text: " " },
          option4: { ...prev.option4, text: " " },
        };
      }
    });
    setRemLifelines((prev) => {
      return {
        ...prev,
        fiftyFifty: false,
      };
    });
  };


  // func to handle Audience Poll
  const handleAudiencePoll = () => {
    audRef.current.showModal();
    setRemLifelines((prev)=>{
      return{
        ...prev,
        audience: false,
      }
    })
  };

  // func to handle flip question 
  const handleFlipQues = (flipQuesObj) =>{
    setQues(() => flipQuesObj.question);
    setOptions((prev) => {
      const newOptions = {
        ...prev,
        option1: flipQuesObj.answers[0],
        option2: flipQuesObj.answers[1],
        option3: flipQuesObj.answers[2],
        option4: flipQuesObj.answers[3],
      };

      setCorrectOptionNumber(()=>{
        return findCorrectOptionNumber(newOptions);
      })
      return newOptions;
    });

    setRemLifelines((prev) => {
      return {
        ...prev,
        flipQues: false,
      };
    });
  }

  return (
    <QuestionContext.Provider value={ { start, setStart, quesNum, setQuesNum, ques, setQues, amountWon, setAmountWon, classname, setClassname, 
    selAns, setSelAns, gameOver, setGameOver, timer, setTimer, isAnswerSelected, setIsAnswerSelected, correctOptionNumber, setCorrectOptionNumber,
     options, setOptions, handleSelect, handleFiftyFifty, handleAudiencePoll, handleFlipQues, remLifelines, ref, audRef } }>
        {children}    
    </QuestionContext.Provider>
  )
}

export { QuestionContext, QuestionProvider }