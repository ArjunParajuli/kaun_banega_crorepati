import { useState } from "react";
import Initial from "./components/Initial";
import Question from "./components/Question";
import PrizeWon from "./components/PrizeWon";
import Timer from "./components/Timer";

function App() {
  const [start, setStart] = useState(false);
  const [quesNum, setQuesNum] = useState(1);
  const [timeOut, setTimeout] = useState(false);

  if (!start) return <Initial setStart={setStart} />;

  return (
    <div className="flex h-screen w-screen">
      <div className="w-9/12 h-full mx-8 main-content flex flex-col ">
        <Timer setQuesNum={setQuesNum} />
        <Question quesNum={quesNum} />
      </div>
      <div className="w-3/12">
        <PrizeWon quesNum={quesNum} />
      </div>
    </div>
  );
}

export default App;
