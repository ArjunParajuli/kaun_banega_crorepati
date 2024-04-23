import React from 'react';
import { FaArrowsRotate } from "react-icons/fa6";

const FlipQues = ({handleFlipQues}) => {
    const flipQuesObj = {
        "id": 17,
        "question": "Which famous scientist developed the theory of relativity?",
        "answers": [
          {
            "text": "Albert Einstein",
            "correct": true
          },
          {
            "text": "Isaac Newton",
            "correct": false
          },
          {
            "text": "Stephen Hawking",
            "correct": false
          },
          {
            "text": "Nikola Tesla",
            "correct": false
          }
        ]
      }
      
  return (
    <div className="flex justify-center items-center">
      <button className="z-15 w-[80px] font-bold text-xl border-4 border-pink-500 bg-gradient-to-b from-[#0e0124] to-[#22074d] text-yellow-500 text-md rounded-full shadow-lg w-16 h-16 flex justify-center items-center "
     onClick={() => handleFlipQues(flipQuesObj)}
      >
        <FaArrowsRotate />
      </button>
    </div>
  )
}

export default FlipQues