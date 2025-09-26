import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { reviewProduct } from "../features/products/productSlice";

export default function Rating({ id, product, currentUser }) {
  const dispatch = useDispatch();

  const [ratings, setRatings] = useState(product?.reviews || []);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setRatings(product?.reviews || []);
  }, [product]);

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || stars === 0) return;

    const newRating = {
      rating: stars,
      comment,
      user: currentUser?.name || "Guest User",
      profilePic: currentUser?.profilePic || "https://i.pravatar.cc/40",
    };

    dispatch(reviewProduct({ id, formData: newRating }));

    setRatings([newRating, ...ratings]);
    setComment("");
    setStars(0);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="border border-border rounded-lg p-4 sm:p-6 bg-bgPrimary shadow-sm space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-textPrimary">Leave a Review</h2>

        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">Your Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-6 h-6 sm:w-6 sm:h-6 cursor-pointer transition-colors 
                ${i <= stars ? "text-primary fill-primary" : "text-gray-300 hover:text-primary"}`}
                onClick={() => setStars(i)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-bgPrimary text-textPrimary min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Submit Review
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <span className="text-2xl font-bold text-textPrimary">{averageRating}</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i <= Math.round(averageRating) ? "text-primary fill-primary" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-textSecondary">({ratings.length} reviews)</span>
      </div>

      <div className="space-y-4">
        {ratings.map((r, index) => (
          <div
            key={index}
            className="p-3 sm:p-4 border border-border rounded-lg bg-bgPrimary shadow-sm"
          >
            <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <img
                  src={r.profilePic}
                  alt={r.user}
                  className="w-8 h-8 rounded-full object-cover border flex-shrink-0"
                />
                <span className="font-semibold text-textPrimary text-sm sm:text-base truncate">{r.user}</span>
              </div>
              <div className="flex space-x-1 flex-shrink-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= r.rating ? "text-primary fill-primary" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-textSecondary text-sm sm:text-base">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
