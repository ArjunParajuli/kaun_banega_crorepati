import React from "react";
import { prizeMoney } from "../data";

const PrizeWon = ({ quesNum }) => {
  const prizeMoneyRev = [...prizeMoney].reverse();
  return (
    <div className="w-3/12">
      <ul className="w-full mt-12">
        {prizeMoneyRev.map((currPrize) => {
          return (
            <li
              key={currPrize.id}
              className={`w-[15rem] flex justify-between items-center gap-4 my-2 py-1 px-2 ${
                quesNum === currPrize.id ? "active" : ""
              } `}
            >
              <span className="text-md font-bold text-yellow-500">
                {currPrize.id}.
              </span>
              <span className="text-center text-md flex-1">
              ₹ {currPrize.amount}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrizeWon;
