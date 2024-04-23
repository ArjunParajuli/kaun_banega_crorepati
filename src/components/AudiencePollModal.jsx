import React, { forwardRef } from "react";

const AudiencePollModal = React.forwardRef(function AudiencePollModal(
  props,
  ref
) {
  const correctNumber = props.correctOptionNumber;
  // console.log(correctNumber)

  const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <dialog ref={ref} className="audience-modal">
      <div className="flex justify-between items-end gap-5">
        {dummy.map((num) => {
          return (
            <div
              key={num.id}
              className={`${
                correctNumber === num.id
                  ? "correct-option-class"
                  : "wrong-option-class"
              } w-[50px] bg-gradient-to-r from-orange-400 to-yellow-400 rounded-md text-center `}
            >
             <span className="text-green-500 text-lg">{correctNumber === num.id ? "55%" : "15%"}</span> 
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => ref.current.close()}
          className="bg-gradient-to-r from-orange-400 to-yellow-400 text-green-500 font-semibold px-4 py-2 rounded-md "
        >
          CLOSE
        </button>
      </div>
    </dialog>
  );
});

export default AudiencePollModal;
