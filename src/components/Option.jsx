import React from "react";

const Option = ({selAns, handleSelect, classname, option}) => {
  return (
    <button
      className={`${selAns === option ? classname : 'bg-gradient-to-b from-[#0e0124] to-[#22074d]'} w-1/2  text-center text-white text-center py-4 border-2 rounded-xl`}
      onClick={() => !selAns && handleSelect(option)}
      disabled={selAns !== null}
    >
      {option?.text}
    </button>
  );
};

export default Option;
