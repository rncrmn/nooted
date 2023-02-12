import React from "react";
import { Notes, Sidebar } from "../components";

function AppPage() {
  return (
    <section>
      <div className="w-full">
        <div className="grid grid-cols-12">
          <Sidebar />
          <Notes />
        </div>
        {/* <AddNote /> */}
      </div>
    </section>
  );
}

export default AppPage;
