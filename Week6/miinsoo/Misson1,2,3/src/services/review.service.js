// import { responseFromReview } from "../dtos/review.dto.js";
import {
    addReview as addReviewRepo,
  } from "../repositories/review.repository.js";

  export const addReview = async (data) => {
    const reviewId = await addReviewRepo(data);
  
    if (!reviewId) {
      throw new Error("리뷰 등록에 실패했습니다.");
    }
  
    return { reviewId };
  };

export const addPhotoReview = async (data) => {
    // 작성 내용
  };

export const showUserReview = async (user_id) => {
  if (!user_id) {
    throw new Error("user_id가 필요합니다.");
  }

  const reviews = await showUserReviewRepo(user_id);
  return reviews;
};