import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Header from "./components/Header";

import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/" element={<Auth setUser={setUser} />} />
      </Routes>
      <Toaster
        toastOptions={{
          position: "top-right",
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
