import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Home/home";
import Login from "./pages/Login/login";

import "../src/style.scss";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
