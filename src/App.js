import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState, useEffect} from "react";
import SignInPage from "./Components/SignInPage";
import GamePage from "./Components/GamePage";


function App() {
  return (
      <div className="wrapper">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInPage />}/>
                <Route path="/game" element={<GamePage />}/>
            </Routes>        
        </BrowserRouter>
      </div>
  );
}

export default App;
