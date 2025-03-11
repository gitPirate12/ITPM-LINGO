import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import './PostDetails.css';

function HandlePostVote({ postId, votes: initialVotes }) {
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [votes, setVotes] = useState(initialVotes || []);
  const [isVoted, setIsVoted] = useState(false);

  
  const voteCount = votes.length;

  useEffect(() => {
   
    if (user) {
      const hasVoted = votes.some(vote => vote === user._id);
      setIsVoted(hasVoted);
    }
  }, [user, votes]);

  const handleToggleVote = async () => {
    if (!user) {
      alert("Please login to vote");
      return;
    }

    try {
      
      const newVotes = isVoted 
        ? votes.filter(vote => vote !== user._id)
        : [...votes, user._id];
      
      setVotes(newVotes);

     
      const response = await axios.patch(
        `http://localhost:3040/api/posts/${postId}/toggleVoteCount`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      
      setVotes(response.data.votes);
    } catch (error) {
      console.error("Error toggling vote:", error);
      
      setVotes(initialVotes);
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
      <span className="vote-count">{voteCount}</span>
    </div>
  );
}

export default HandlePostVote;