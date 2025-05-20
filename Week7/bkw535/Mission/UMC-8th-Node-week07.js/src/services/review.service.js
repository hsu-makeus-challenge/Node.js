// import { responseFromReview } from "../dtos/review.dto.js";
import {
    addReview as addReviewRepo,
    showUserReview as showUserReviewRepo,
  } from "../repositories/review.repository.js";

  export const addReview = async (data) => {
    const reviewId = await addReviewRepo(data);
  
    if (!reviewId) {
      throw new ReviewIdNotFoundError("reviewId가 없습니다.", data);
    }
  
    return { reviewId };
  };

export const addPhotoReview = async (data) => {
    // 작성 내용
  };

  export const showUserReview = async (userId) => {
    if (!userId) {
      throw new UserIdNotFoundError("userId가 없습니다.", data);
    }
  
    const reviews = await showUserReviewRepo(userId);
    return reviews;
  };