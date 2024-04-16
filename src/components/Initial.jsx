import React, { useRef } from "react";
import KBC_LOGO from "../assets/kbc-logo.png";

const Initial = ({ setStart }) => {
  const name = useRef();
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="rotate-container mb-8">
        <img src={KBC_LOGO} alt="logo" className="w-60" />
      </div>
      <input
        ref={name}
        className="border border-transparent rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type="text"
        placeholder="Enter your name"
        style={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" }}
      />
      <button
        onClick={() => {
            if(name.current.value !== ''){
                setStart((prev) => !prev)
            }  
        }
        }
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Start Game
      </button>
    </div>
  );
};

export default Initial;
