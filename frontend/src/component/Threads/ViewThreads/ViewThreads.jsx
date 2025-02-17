import "./ViewThreads.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";

const ViewThreads = () => {
  const [threads, setThreads] = useState([]);

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
      <div className="threads-container">
        {threads.map((thread) => (
          <div key={thread._id} className="thread">
            <div className="thread-content-container">
              <div className="thread-info">
                <p className="author-name">
                  {thread.author.firstName} {thread.author.lastName}
                </p>
                <p className="author-extras">
                  @{thread.author.userName} &middot;{" "}
                  {new Date(thread.createdAt).toLocaleString()}
                </p>

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
                <BiLike className="like" />
                <span className="comment">Reply</span>
              </div>
            </div>
            <div className="thread-stats">
              <p>
                <FaChevronDown /> 30 replies
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewThreads;
