import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

function HandleReplyVote({ replyId, votes: initialVotes, onVoteUpdate }) {
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [votes, setVotes] = useState(initialVotes || []);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVoted(votes.includes(user._id));
    }
  }, [votes, user]);

  const handleToggleVote = async () => {
    if (!user) {
      alert("Please login to vote");
      return;
    }

    try {
      
      const newVotes = isVoted
        ? votes.filter((vote) => vote !== user._id)
        : [...votes, user._id];

      setVotes(newVotes);
      setIsVoted(!isVoted);

      
      const response = await axios.patch(
        `http://localhost:3040/api/replies/${replyId}/toggleVoteCount`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

     
      setVotes(response.data.votes);
      setIsVoted(response.data.votes.includes(user._id));
      onVoteUpdate?.(replyId, response.data.votes.length);
    } catch (error) {
      console.error("Error toggling vote:", error);
      
      setVotes(initialVotes);
      setIsVoted(initialVotes.includes(user._id));
    }
  };

  return (
    <div className="vote-container">
      <button
        onClick={handleToggleVote}
        className={`vote-button ${isVoted ? "voted" : ""}`}
        disabled={!user}
      >
        <AiOutlineHeart className={`vote-icon ${isVoted ? "active" : ""}`} />
      </button>
      <span className="vote-count">{votes.length}</span>
    </div>
  );
}

export default HandleReplyVote;
