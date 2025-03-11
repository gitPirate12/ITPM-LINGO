import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.css";

function EditPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    tags: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3040/api/posts/${postId}`
        );
        const { question, description, tags } = response.data;
        setFormData({
          question,
          description,
          tags: tags.join(", "),
        });
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("Error fetching post details");
      }
    };
    fetchPostDetails();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      await axios.patch(
        `http://localhost:3040/api/posts/${postId}`,
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
      console.error("Error updating post:", error);
      setError(error.response?.data?.message || "Error updating post");
    }
  };

  return (
    <div className="edit-post-container">
      <h1 className="edit-post-header">Edit Post</h1>
      {error && <div className="error-message">{error}</div>}

      <form className="edit-post-form" onSubmit={handleSubmit}>
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

        <div className="button-group">
          <button type="submit" className="submit-button">
            Save Changes
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

export default EditPost;
