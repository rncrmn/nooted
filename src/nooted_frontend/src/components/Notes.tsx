import React, { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { Note } from "./";

function Notes() {
  const { actor, getOwnedNotes, notes, getPrincipalID, content } =
    useContext(AppContext);

  useEffect(() => {
    getPrincipalID();
    getOwnedNotes();
  }, [actor]);

  return (
    <div className="relative col-span-11 bg-white">
      {/* <div>
        {principal} <button onClick={logout}>Logout</button>
      </div> */}

      <div className="grid grid-cols-4 gap-8 px-12 py-8">
        {/* <AnimatePresence mode="popLayout"> */}
        <AnimatePresence>
          {notes
            ?.map((note, index) => (
              <Note key={note?.id} note={note} keyId={index} />
            ))
            .reverse()}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Notes;
