import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, AppPage } from "./pages";

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </div>
  );
}

export default App;
