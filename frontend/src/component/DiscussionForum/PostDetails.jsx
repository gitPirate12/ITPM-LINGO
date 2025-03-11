import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import DeletePost from "./DeletePost";
import { FaEllipsisVertical } from "react-icons/fa6";
import ReplyItem from "./ReplyDetails";
import HandlePostVote from "./HandleVote"; 
import "./PostDetails.css";

const PostDetails = ({ post }) => {
  const navigate = useNavigate();
  const [editReplyId, setEditReplyId] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [voteCount, setVoteCount] = useState(post.voteCount); 

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleEditPost = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  const handleAddReply = (postId) => {
    navigate(`/addreply/${postId}`);
  };

  
  const handleVoteUpdate = (postId, newVoteCount) => {
    if (postId === post._id) {
      setVoteCount(newVoteCount);
    }
  };

  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-header">
          <div className="post-creator-details">
            <span className="post-author">
              {typeof post.author === "object"
                ? post.author.userName
                : post.author}
            </span>
            <span className="post-date">{formattedDate}</span>
          </div>
          <FaEllipsisVertical
            className="icon hover-effect"
            onClick={() => handleEditPost(post._id)}
          />
        </div>

        <h3 className="post-question">{post.question}</h3>
        <p className="post-description">{post.description}</p>

        <div className="post-meta">
          <span className="post-tags">{post.tags.join(", ")}</span>
        </div>
      </div>

      
      <div className="post-actions">
        <div className="vote-group">
          <HandlePostVote
            postId={post._id}
            initialVotes={voteCount} // ✅ Pass initial vote count
            onVoteUpdate={handleVoteUpdate} // ✅ Handle vote update
          />
        </div>

        <FaComment
          className="icon hover-effect"
          onClick={() => handleAddReply(post._id)}
        />
        <DeletePost postId={post._id} />
      </div>

      <div className="replies-section">
        <div 
          className="replies-header collapse-trigger"
          onClick={() => setShowReplies(!showReplies)}
        >
          {post.replies.length} {post.replies.length === 1 ? "Reply" : "Replies"}
          <span className={`chevron ${showReplies ? "open" : ""}`}>▼</span>
        </div>

        {showReplies && (
          <ul className="replies-list">
            {post.replies.map((reply) => (
              <ReplyItem
                key={reply._id}
                reply={reply}
                editReplyId={editReplyId}
                onEditReply={setEditReplyId}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
