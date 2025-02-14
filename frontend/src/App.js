import "./App.css";

import Addemoji from "./component/EmojiText/Addemoji";

import EmojiText from "./component/EmojiText/EmojiText";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";
import ViewPosts from "./component/DiscussionForum/ViewPosts";
import AddPost from "./component/DiscussionForum/AddPost";
import EditPost from "./component/DiscussionForum/EditPost";
import AddReply from "./component/DiscussionForum/AddReply";
import EditReply from "./component/DiscussionForum/EditReply";
import SideBar from "./component/SideBar/SideBar";

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

        <section className="posts">
          <Routes>
            <Route path="/viewposts" element={<ViewPosts />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/editpost/:postId" element={<EditPost />} />
            <Route path="/addreply/:postId" element={<AddReply />} />
            <Route path="/editreply/:replyId" element={<EditReply />} />
          </Routes>
        </section>

        <section className="extras">
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
