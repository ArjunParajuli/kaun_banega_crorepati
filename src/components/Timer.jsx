import { useEffect } from 'react';

const Timer = ({timer, setTimer, handleSelect, selAns, isAnswerSelected}) => {

  useEffect(()=>{
    
      const timerId = setTimeout(()=>{
        if(timer !== 0 && !isAnswerSelected){
          setTimer((prev) => (prev-1))
        }
  
        if(timer === 0 && selAns === null){
          handleSelect(null);
        }
        
      }, 1000)

    return () =>{
      clearTimeout(timerId);  // Cleanup the timeout when component unmounts or when time changes
    }

  }, [timer]) // Run useEffect whenever time changes

  return (
    <div className="flex justify-center items-start">
      <p className='border-4 border-pink-500 bg-gradient-to-b from-[#0e0124] to-[#22074d] text-yellow-500 font-bold text-xl rounded-full shadow-lg w-16 h-16 flex justify-center pt-1 '>{timer}</p>
    </div>
  );
}

export default Timer;