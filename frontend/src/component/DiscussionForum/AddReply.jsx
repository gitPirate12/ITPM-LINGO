import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddReply.css";

function AddReply({ parentReplyId }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please log in to add a reply");
        return;
      }

      await axios.post(
        "http://localhost:3040/api/replies",
        {
          comment,
          parentid: postId,
          parentReplyId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      navigate("/viewposts");
    } catch (error) {
      console.error("Error adding reply:", error);
      setError(error.response?.data?.message || "Error adding reply");
    }
  };

  return (
    <div className="add-reply-container">
      <h1 className="add-reply-header">Add Reply</h1>

      <form className="add-reply-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Your Reply</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows="4"
            className="reply-textarea"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button type="submit" className="submit-button">
            Post Reply
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/viewposts")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReply;
