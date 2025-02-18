import "./ViewThreads.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useThreadsContext } from "../../../hooks/useThreadsContext";

const ViewThreads = () => {
  const { threads, dispatch } = useThreadsContext();
  const [openReplies, setOpenReplies] = useState({});

  const [replies, setReplies] = useState(0);

  const fetchThreads = async () => {
    try {
      const response = await axios.get("http://localhost:3040/api/threads");
      dispatch({ type: "GET_THREADS", payload: response.data });
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  const fetchReplies = async (threadId) => {
    try {
      const response = await axios.get(
        `http://localhost:3040/api/replies/${threadId}`
      );
      dispatch({
        type: "UPDATE_THREAD_REPLIES",
        payload: { threadId, replies: response.data },
      });
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const toggleReplies = (threadId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [threadId]: !prev[threadId],
    }));
    if (!replies[threadId]) {
      fetchReplies(threadId);
    }
  };

  const renderReplies = (parentReplyId, replies) => {
    return replies
      .filter((reply) => reply.parentReplyId === parentReplyId)
      .map((reply) => (
        <div key={reply._id} className="reply">
          <div className="reply-author-info">
            <p className="reply-author">
              {reply.author.firstName} {reply.author.lastName}
            </p>
            <p className="reply-author-extras">
              @{reply.author.userName}{" "}
              {new Date(reply.createdAt).toLocaleString()}
            </p>
            <IoEllipsisVerticalSharp className="reply-options" />
          </div>

          <p className="reply-content">{reply.content}</p>

          <div className="nested-replies">
            {renderReplies(reply._id, replies)}
          </div>
        </div>
      ));
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
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

              <IoEllipsisVerticalSharp className="options" />
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
            <p
              onClick={() => toggleReplies(thread._id)}
              style={{ cursor: "pointer" }}
            >
              {openReplies[thread._id] ? <FaChevronUp /> : <FaChevronDown />}{" "}
              {thread.replies.length} replies
            </p>
          </div>
          {openReplies[thread._id] && (
            <div className="replies-container">
              {renderReplies(null, thread.replies)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewThreads;
