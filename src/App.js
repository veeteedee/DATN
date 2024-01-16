//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Home from "./components/Home"
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App">

      {/* <Home /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
    </div > 
  );
}

export default App;



