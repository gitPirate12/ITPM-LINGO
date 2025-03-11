// ReplyDetails.jsx
import React from "react";
import DeleteReply from "./DeleteReply";
import EditReply from "./EditReply";
import HandleReplyVote from "./HandleReplyVote";
import "./ReplyDetails.css";
import { FaEllipsisVertical } from "react-icons/fa6";

const ReplyDetails = ({ reply, replyIndex, editReplyId, onEditReply, onVoteUpdate }) => {
  const formattedDate = new Date(reply.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="reply-item">
      <div className="reply-header">
        <div className="reply-creator-details">
          <span className="reply-author">
            {typeof reply.author === "object" ? reply.author.userName : "Unknown"}
          </span>
          <span className="reply-date">{formattedDate}</span>
        </div>
        <FaEllipsisVertical
          className="icon hover-effect"
          onClick={() => onEditReply(reply._id)}
        />
      </div>

      <p className="reply-comment">{reply.comment}</p>

      <div className="reply-actions">
        <HandleReplyVote 
          replyId={reply._id} 
          initialVotes={reply.voteCount}
          onVoteUpdate={onVoteUpdate}
        />
        <DeleteReply replyId={reply._id} />
      </div>

      {editReplyId === reply._id && (
        <EditReply 
          replyId={reply._id} 
          onCancel={() => onEditReply(null)}
          initialComment={reply.comment}
        />
      )}
    </li>
  );
};

export default ReplyDetails;