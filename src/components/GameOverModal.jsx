import React, { forwardRef } from "react";
import { FaRupeeSign } from "react-icons/fa";

const GameOverModal = forwardRef(function GameOverModal(props, ref) {
  const inWords = {
    0: "Zero",
    1000: "One thousand",
    2000: "Two thousand",
    3000: "Three thousand",
    5000: "Five thousand",
    10000: "Ten thousand",
    20000: "Twenty thousand",
    40000: "Forty thousand",
    80000: "Eighty thousand",
    160000: "One Lakh sixty thousand",
    320000: "Three Lakhs twenty thousand",
    640000: "Six Lakhs forty thousand",
    1250000: "Twelve Lakhs fifty thousand",
    2500000: "Twenty Five Lakhs",
    5000000: "Fifty Lakhs",
    10000000: "One Crore",
    70000000: "Seven Crore",
  };

  const classname =
    props.amountWon === 70000000 || props.amountWon === 10000000
      ? "text-green-500"
      : "text-red-500";

  return (
    <dialog ref={ref} className="result-modal">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className={`text-2xl font-bold mb-4 ${classname}`}>
            {props.amountWon === 70000000 || props.amountWon === 10000000
              ? "Congratulations!"
              : "Game Over!"}
          </p>
          <p className="text-lg mb-4">You Won: </p>
          <p className="text-lg mb-4 flex items-center justify-center gap-1">
            <FaRupeeSign className="text-green-500" />{" "}
            <span>{inWords[props.amountWon]}</span>
          </p>
          <p className={`text-lg mb-4 ${classname}`}>
            {props.amountWon === 70000000 || props.amountWon === 10000000 ? (
              <span className="font-bold">Your Knowledge is Unmatched!</span>
            ) : (
              <span>Better luck Next time!</span>
            )}
          </p>
          <form>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => ref.current.close()}
            >
              Restart
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default GameOverModal;
