import { useContext } from "react";
import Initial from "./components/Initial";
import Question from "./components/Question";
import PrizeWon from "./components/PrizeWon";
import './App.css';
import { QuestionContext } from "./components/QuestionContext";

function App() {
  
  const { start, setStart, quesNum, setQuesNum, amountWon, setAmountWon } = useContext(QuestionContext);

  if (!start) return <Initial setStart={setStart} />;

  return (
    <div className="flex h-screen w-screen">
      <div className="w-9/12 h-full mx-8 main-content flex flex-col ">
        <Question />
      </div>
      <div className="w-3/12">
        <PrizeWon />
      </div>
    </div>
  );
}

export default App;
