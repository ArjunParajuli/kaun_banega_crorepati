import React, { useEffect, useState } from "react";
import bg_img from "../../public/KBC_bg.jpeg";
import { questions } from "../data";
import Option from "./Option";

const Question = ({ quesNum }) => {
  const [ques, setQues] = useState(null);
  const [selAns, setSelAns] = useState(null);
  const [classname, setClassname] = useState('');

  useEffect(() => {
    setQues(questions[quesNum - 1].question);
  }, [quesNum]);

  const option1 = questions[quesNum - 1].answers[0];
  const option2 = questions[quesNum - 1].answers[1];
  const option3 = questions[quesNum - 1].answers[2];
  const option4 = questions[quesNum - 1].answers[3];

  const handleSelect = (option) =>{
    setSelAns(option);
    setClassname(option.correct ? 'correct' : 'wrong');
  }

  return (
    <div
      className="container mx-auto w-full h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      <div className="w-full h-full flex flex-col items-center justify-end relative z-10">
        <h2 className="w-11/12 bg-gradient-to-b from-[#100241] to-black text-white text-center py-4 border-2 rounded-lg">
          {ques}
        </h2>

        <div className="flex flex-col items-center my-8 w-full">
          <div className="flex justify-center gap-6 mb-4 w-10/12">
            <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={option1} />
            <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={option2} />
          </div>

          <div className="flex justify-center gap-6 w-10/12">
          <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={option3} />
          <Option selAns={selAns} handleSelect={handleSelect} classname={classname} option={option4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
