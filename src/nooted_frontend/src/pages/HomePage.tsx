import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function HomePage() {
  const { login } = useContext(AppContext);

  return (
    <section className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="container flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-10 w-[600px] m-auto text-center h-[]">
          <h1 className="flex items-center justify-center gap-1">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="text-green-700"
              width={42}
              height={42}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <span className="font-mono text-3xl font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-green-500 via-green-600 to-green-700">
              Nooted
            </span>
          </h1>
          <p className="font-sans font-black uppercase text-7xl">
            Your Notes, Your Control
          </p>
          <p className="mb-5 font-sans text-4xl font-semibold text-green-700">
            Take Control of Your Notes in the Decentralized Web with{" "}
            <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-600 to-green-700">
              Nooted
            </span>
          </p>
          <button
            className="px-7 py-3.5 font-bold shadow-md bg-green-100 hover:bg-green-200 text-green-900 rounded-full text-md font-sans"
            onClick={login}
          >
            Login with II
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
