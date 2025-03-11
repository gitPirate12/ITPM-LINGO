import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import "./ReplyDetails.css";

function DeleteReply({ replyId }) {
  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.delete(
        `http://localhost:3040/api/replies/${replyId}`,
        config
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  return (
    <MdDeleteOutline className="icon hover-effect" onClick={handleDelete} />
  );
}

DeleteReply.propTypes = {
  replyId: PropTypes.string.isRequired,
};

export default DeleteReply;
