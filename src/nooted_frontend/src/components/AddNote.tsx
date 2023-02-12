import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function AddNote() {
  const { addNote } = useContext(AppContext);

  return (
    <button
      className="fixed p-3 bg-black rounded-full shadow-sm cursor-pointer right-8 bottom-8"
      onClick={addNote}
    >
      <svg
        fill="none"
        stroke="white"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width={28}
        height={28}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
}

export default AddNote;
