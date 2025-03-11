import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostDetails";
import GenerateReport from "./GenerateReport";
import "./ViewPosts.css";

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3040/api/posts/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message || "Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      const filtered = posts.filter(
        (post) =>
          post.author.userName.toLowerCase().includes(query.toLowerCase()) ||
          post.question.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-posts-container">
      <p>Discussion forum</p>
      <div className="button-container">
        <GenerateReport />
        <button
          className="add-post-button"
          onClick={() => navigate("/addpost")}
        >
          Add Post
        </button>
        <textarea
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="posts-list">
        {(searchQuery.trim() === "" ? posts : filteredPosts).map(
          (post, index) => (
            <PostItem key={post._id} post={post} index={index} />
          )
        )}
      </div>
    </div>
  );
}

export default ViewPosts;
