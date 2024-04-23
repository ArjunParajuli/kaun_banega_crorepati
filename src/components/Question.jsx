import React, { useContext } from "react";
import bg_img from "../assets/KBC_bg.jpeg";
import Option from "./Option";
import GameOverModal from "./GameOverModal";
import Timer from "./Timer";
import FiftyFifty from "./FiftyFifty";
import AudiencePoll from "./AudiencePoll";
import AudiencePollModal from "./AudiencePollModal";
import FlipQues from "./FlipQues";
import { QuestionContext } from "./QuestionContext";

const Question = ({}) => {
  const {
    ques,
    amountWon,
    classname,
    selAns,
    timer,
    setTimer,
    isAnswerSelected,
    correctOptionNumber,
    options,
    handleSelect,
    handleFiftyFifty,
    handleAudiencePoll,
    handleFlipQues,
    remLifelines,
    ref,
    audRef,
  } = useContext(QuestionContext);

  return (
    <div
      className="container mx-auto w-full h-screen bg-cover bg-center relative "
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      <div className="absolute sm:top-[350px] left-0 right-0 mx-auto z-[12]">
        <div className="flex justify-center gap-5">
          {remLifelines.fiftyFifty && (
            <FiftyFifty handleFiftyFifty={handleFiftyFifty} />
          )}
          {remLifelines.audience && (
            <AudiencePoll handleAudiencePoll={handleAudiencePoll} />
          )}
          {remLifelines.flipQues && (
            <FlipQues handleFlipQues={handleFlipQues} />
          )}
        </div>
      </div>

      <div className="absolute sm:top-[437px] left-0 right-0 mx-auto ">
        <Timer
          timer={timer}
          setTimer={setTimer}
          handleSelect={handleSelect}
          selAns={selAns}
          isAnswerSelected={isAnswerSelected}
        />
      </div>

      <GameOverModal ref={ref} amountWon={amountWon} />

      <AudiencePollModal
        ref={audRef}
        correctOptionNumber={correctOptionNumber}
      />

      <div className="w-full h-full flex flex-col items-center justify-end relative ">
        <h2 className="w-11/12 bg-gradient-to-b from-[#100241] to-black text-white text-center py-4 border-2 rounded-lg">
          {ques}
        </h2>

        <div className="flex flex-col items-center my-8 w-full">
          <div className="flex justify-center gap-6 mb-4 w-10/12">
            <Option
              selAns={selAns}
              handleSelect={handleSelect}
              classname={classname}
              option={options?.option1}
            />
            <Option
              selAns={selAns}
              handleSelect={handleSelect}
              classname={classname}
              option={options?.option2}
            />
          </div>

          <div className="flex justify-center gap-6 w-10/12">
            <Option
              selAns={selAns}
              handleSelect={handleSelect}
              classname={classname}
              option={options?.option3}
            />
            <Option
              selAns={selAns}
              handleSelect={handleSelect}
              classname={classname}
              option={options?.option4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
