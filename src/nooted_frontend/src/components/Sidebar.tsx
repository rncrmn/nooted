import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Sidebar() {
  const { addNote, logout } = useContext(AppContext);
  return (
    <div className="z-10 col-span-1 bg-white border-r border-gray-300 shadow-sm">
      <div className="flex flex-col items-center justify-between h-screen py-8">
        <div className="flex flex-col gap-5">
          <div className="px-3 py-1 font-sans text-2xl font-bold text-center text-green-900 bg-green-500 border-b-2 border-green-600 rounded-lg shadow-md">
            N
          </div>
          <button
            className="p-2.5 rounded-full bg-green-200 hover:bg-green-300"
            onClick={addNote}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width={26}
              height={26}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <button
          className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={logout}
        >
          <svg
            fill="white"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width={26}
            height={26}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
