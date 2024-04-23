import React from 'react';
import { FaPeopleGroup } from "react-icons/fa6";

const AudiencePoll =  ({handleAudiencePoll}) => {
  return (
    <div className="flex justify-center items-center">
      <button className="z-15 w-[80px] font-bold border-4 border-pink-500 bg-gradient-to-b from-[#0e0124] to-[#22074d] text-yellow-500 text-md rounded-full shadow-lg w-16 h-16 flex justify-center items-center "
      onClick={handleAudiencePoll}
      >
        <FaPeopleGroup className='text-3xl' />
      </button>
    </div>
  )
}

export default AudiencePoll