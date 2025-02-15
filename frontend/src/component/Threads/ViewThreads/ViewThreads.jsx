import "./ViewThreads.css";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import axios from "axios";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";




const ViewThreads = () => {
  const typedHeading = useRef(null);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const typed = new Typed(typedHeading.current, {
      strings: ["Hey there (username)"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      cursorChar: ".",
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await axios.get("http://localhost:3040/api/threads");

      setThreads(response.data);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="view-threads-container">
      <div className="header-container">
        <h1>
          <span ref={typedHeading}>Hey there</span>
        </h1>
      </div>

      <div className="threads-container">
        {threads.map((thread) => (
          <div key={thread._id} className="thread">
            <div className="thread-content-container">

            
            <div className="thread-info">
              <p className="author-name">
                {thread.author.firstName} {thread.author.lastName}
              </p>
              <p className="author-extras">@{thread.author.userName} &middot; {new Date(thread.createdAt).toLocaleString()}</p>
              
              <IoEllipsisHorizontalSharp className="options" />

              
             
            </div>
            <p className="thread-content">{thread.body}</p>
            
            <div className="thread-tags">
              {thread.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="thread-actions">
            <FaRegComment />
            <FaRegHeart />
            </div>
            

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewThreads;
