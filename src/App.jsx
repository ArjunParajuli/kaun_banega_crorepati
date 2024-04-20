import { useState } from "react";
import Initial from "./components/Initial";
import Question from "./components/Question";
import PrizeWon from "./components/PrizeWon";
import './App.css';

function App() {
  const [start, setStart] = useState(false); // for the enter name comp
  const [quesNum, setQuesNum] = useState(1);
  const [amountWon, setAmountWon] = useState(0);

  if (!start) return <Initial setStart={setStart} />;

  return (
    <div className="flex h-screen w-screen">
      <div className="w-9/12 h-full mx-8 main-content flex flex-col ">
        <Question quesNum={quesNum} setQuesNum={setQuesNum} amountWon={amountWon} setAmountWon={setAmountWon} />
      </div>
      <div className="w-3/12">
        <PrizeWon quesNum={quesNum} />
      </div>
    </div>
  );
}

export default App;
