import React, { useState } from "react";
import axios from "axios";
import "./EditReply.css";

function EditReply({ replyId, onCancel }) {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please log in to edit the reply");
        return;
      }

      await axios.patch(
        `http://localhost:3040/api/replies/${replyId}`,
        {
          comment: newComment,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      onCancel(true); // On successful edit, notify parent (or you can decide to simply cancel)
    } catch (error) {
      console.error("Error editing reply:", error);
      setError(error.response?.data?.message || "Error editing reply");
    }
  };

  return (
    <div className="edit-reply-container">
      <form className="edit-reply-form" onSubmit={handleEdit}>
        <div className="form-group">
          <label htmlFor="comment">Edit Comment</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            rows="3"
            className="reply-textarea"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditReply;
