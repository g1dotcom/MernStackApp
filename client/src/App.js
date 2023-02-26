import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Header from "./components/Header";
function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
