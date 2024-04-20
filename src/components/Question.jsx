import React, { useEffect, useRef, useState } from "react";
import bg_img from "../assets/KBC_bg.jpeg";
import { questions } from "../data";
import Option from "./Option";
import { prizeMoney } from "../data";
import GameOverModal from "./GameOverModal";
import Timer from "./Timer";
import FiftyFifty from "./FiftyFifty";
import useSound from "use-sound";
import gameStart from "../sounds/play.mp3";
import correctAns from "../sounds/correct.mp3";
import wrongAns from "../sounds/wrong.mp3";

const Question = ({ quesNum, setQuesNum, amountWon, setAmountWon }) => {
  const [ques, setQues] = useState(null); // current question
  const [selAns, setSelAns] = useState(null); // selected answer
  const [classname, setClassname] = useState(''); // for applying background color to selected option 
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(5);
  const [options, setOptions] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null
  })
  const [remLifelines, setRemLifelines] = useState({
    fiftyFifty: true,
    audience: true,
    flipQues: true
  })
  const ref = useRef(); // for gameOverModal

  // useSound hook
  const [gameStartSound] = useSound(gameStart);
  const [correctAnsSound] = useSound(correctAns);
  const [wrongAnsSound] = useSound(wrongAns);

//  only play at start of application
useEffect(()=>{
  gameStartSound()
}, [gameStartSound])

  useEffect(() => {
    if(quesNum !== (questions.length+1)){
      setQues(questions[quesNum - 1].question);
    }
  }, [quesNum]);


  // update options when quesNum changes
  useEffect(()=>{
    setOptions((prev)=>{
      return {
        ...prev,
        option1 : questions[quesNum - 1].answers[0],
        option2 : questions[quesNum - 1].answers[1],
        option3 : questions[quesNum - 1].answers[2],
        option4 : questions[quesNum - 1].answers[3]
      }
    })
  }, [quesNum])

  const handleSelect = (option) =>{
    setSelAns(option); 
    const isCorrect = option?.correct;
    setClassname(isCorrect ? 'correct' : 'wrong');
    if(isCorrect){ // answer is correct then go to next ques
      correctAnsSound();
      setTimeout(()=>{
        setSelAns(null); // reset selected ans for next ques
        setQuesNum((prev) =>{
          return (prev+1)
        })
        setTimer(5); 
      }, 3000);
    setAmountWon(() =>{
      return (parseInt(prizeMoney[quesNum-1].amount))
    })  
  }else if(!isCorrect){ // ans is incorrect
    wrongAnsSound();
    setTimeout(()=>{
      setGameOver(true);
      ref.current.showModal();
    }, 3000);
  }
  }
 
  useEffect(() => {
    if (quesNum === (questions.length+1)) {
      setGameOver(true);
      ref.current.showModal();
    }
  }, [quesNum]);


  const handleFiftyFifty = () =>{
    setOptions((prev)=>{
      if(prev.option1.correct || prev.option4.correct){
        return{
          ...prev,
          option2: { ...prev.option2, text: " "},  // while updating the required property, preserve other properties  
          option3: { ...prev.option3, text: " "}
        }
      }else{
        return{
          ...prev,
          option1: { ...prev.option1, text: " " },
          option4: { ...prev.option4, text: " " }
        }
      }
    })

    setRemLifelines((prev)=>{
      return {
        ...prev,
        fiftyFifty: false
      }
    })
    }
  
  

  return (
    <div
      className="container mx-auto w-full h-screen bg-cover bg-center relative "
      style={{ backgroundImage: `url(${bg_img})` }}
    >

      <div className="absolute sm:top-[350px] left-0 right-0 mx-auto z-[12]">
      {
        remLifelines.fiftyFifty && <FiftyFifty handleFiftyFifty={handleFiftyFifty} />
      }
      </div>

      <div className="absolute sm:top-[437px] left-0 right-0 mx-auto ">
        <Timer timer={timer} setTimer={setTimer} handleSelect={handleSelect} selAns={selAns} />
      </div>

      <GameOverModal ref={ref} amountWon={amountWon} />
      
      <div className="w-full h-full flex flex-col items-center justify-end relative ">
        <h2 className="w-11/12 bg-gradient-to-b from-[#100241] to-black text-white text-center py-4 border-2 rounded-lg">
          {ques}
        </h2>

        <div className="flex flex-col items-center my-8 w-full">
          <div className="flex justify-center gap-6 mb-4 w-10/12">
            <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={options?.option1} />
            <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={options?.option2} />
          </div>

          <div className="flex justify-center gap-6 w-10/12">
          <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={options?.option3} />
          <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={options?.option4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
