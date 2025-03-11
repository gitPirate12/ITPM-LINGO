import React from "react";
import axios from "axios";
import "./PostDetails.css";
import { MdDeleteOutline } from "react-icons/md";

function DeletePost({ postId }) {
  const handleDelete = async () => {
    try {
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);
      if (!user) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.delete(`http://localhost:3040/api/posts/${postId}`, config);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <MdDeleteOutline onClick={handleDelete} className="icon hover-effect" />
  );
}

export default DeletePost;
