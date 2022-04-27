import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, BrowserRouterProps } from 'react-router-dom';
import {useState, useEffect, useMemo} from "react";
import SignInPage from "./Components/SignInPage";
import GamePage from "./Components/GamePage";
import UsernameContext from "./UsernameContext";


function App() {
    
    const [username, setUsername] = useState("Notch")
    const value = useMemo(
        () => ({ username, setUsername }),
        [username]
    );
    
  return (
      <div className="wrapper">
          <UsernameContext.Provider value={value}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<SignInPage />}/>
                      <Route path="/game" element={<GamePage />}/>
                  </Routes>
              </BrowserRouter>
          </UsernameContext.Provider>
      </div>
  );
}

export default App;
