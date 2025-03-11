import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

function AddPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    tags: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("You must be logged in to add a post");
        return;
      }

      await axios.post(
        "http://localhost:3040/api/posts/",
        {
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      navigate("/viewposts");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response?.data?.message || "Error submitting form");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-post-container">
      <h1 className="add-post-header">Create New Post</h1>

      <form className="add-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button type="submit" className="submit-button">
            Create Post
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

export default AddPost;
