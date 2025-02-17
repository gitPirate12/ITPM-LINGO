import "./App.css";

import React, { useState } from "react";
import EmojiTranslator from "./component/EmojiTranslator/EmojiTranslator";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";
import ViewThreads from "./component/Threads/ViewThreads/ViewThreads";

import SideBar from "./component/SideBar/SideBar";
import SearchBar from "./component/Searchbar/SearchBar";
import Translator from "./component/Translator/Translator";
import Popup from "./component/Popup/Popup";

function App() {
  const [isEmojiPopupOpen, setIsEmojiPopupOpen] = useState(false);
  const [isTranslatorPopupOpen, setIsTranslatorPopupOpen] = useState(false);

  const openEmojiPopup = () => setIsEmojiPopupOpen(true);
  const closeEmojiPopup = () => setIsEmojiPopupOpen(false);

  const openTranslatorPopup = () => setIsTranslatorPopupOpen(true);
  const closeTranslatorPopup = () => setIsTranslatorPopupOpen(false);

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
              <p>Wanna know what an emoji means in Sinhala?</p>
              <button onClick={openEmojiPopup} className="try">
                Try it now!
              </button>
              <Popup showPopup={isEmojiPopupOpen} closePopup={closeEmojiPopup}>
                <EmojiTranslator />
              </Popup>
            </div>

            <div className="translator-container">
              <p>Need a quick translation?</p>
              <button onClick={openTranslatorPopup} className="click">
                Just a click away!
              </button>
              <Popup
                showPopup={isTranslatorPopupOpen}
                closePopup={closeTranslatorPopup}
              >
                <Translator />
              </Popup>
            </div>

            <div className="footer">
              <p>
                Loosely designed in <strong>Galileo AI</strong> and built with <strong>React.js</strong> and <strong>CSS</strong> by yours truly.
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
