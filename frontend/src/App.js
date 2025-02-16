import "./App.css";

import Addemoji from "./component/EmojiText/Addemoji";

import EmojiText from "./component/EmojiText/EmojiText";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";
import ViewThreads from "./component/Threads/ViewThreads/ViewThreads"


import SideBar from "./component/SideBar/SideBar";
import SearchBar from "./component/Searchbar/SearchBar";

function App() {
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
          <Routes>
            
            
          </Routes>
        </section>

        <section className="extras">
          <SearchBar />
          <Routes>
            <Route path="/add" element={<Addemoji />} />
            <Route path="emojiText" element={<EmojiText />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
