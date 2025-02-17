import "./App.css";

import React, { useState } from "react";
import EmojiTranslator from "./component/EmojiTranslator/EmojiTranslator";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";
import ViewThreads from "./component/Threads/ViewThreads/ViewThreads";

import SideBar from "./component/SideBar/SideBar";
import SearchBar from "./component/Searchbar/SearchBar";
import Translator from "./component/Translator/translator";
import Popup from "./component/Popup/Popup";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);

  const closePopup = () => setIsPopupOpen(false);
  return (
    <Router>
      <div className="layout">
        <section className="side-bar">
          <SideBar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </section>

        <section className="threads">
          <ViewThreads />
          <Routes></Routes>
        </section>

        <section className="extras">
          <div className="grid-container">
            <SearchBar />
            <div className="emoji-translator-container">
              <p>Wanna know what an emoji means in Sinhala? </p>
              <button onClick={openPopup} className="try">Try it now!</button>
              <Popup showPopup={isPopupOpen} closePopup={closePopup}>
                <EmojiTranslator />
              </Popup>
            </div>

            <div className="translator-container">
              <p>Need a quick translation? </p>
              <button>Just a click away!</button>
            </div>

            <div className="footer">
              <p>
                Loosely designed in Galileo AI and built with React.js and CSS
                by yours truly.
              </p>
              <p>© 2025 Aneeq Shaffy</p>
            </div>

            {/* <EmojiTranslator /> */}
          </div>
          <Routes></Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
