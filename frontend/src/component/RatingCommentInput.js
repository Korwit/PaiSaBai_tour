import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const RatingCommentInput = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== "") {
      onSubmit({ rating, comment });
      setRating(0);
      setComment("");
    } else {
      alert("Please provide a rating and comment before submitting.");
    }
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={handleRatingChange}
        value={rating}
        size={24}
        activeColor="#ffd700"
      />
      <textarea
        placeholder="Add your comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleSubmit}>Submit Rating & Comment</button>
    </div>
  );
};

export default RatingCommentInput;
