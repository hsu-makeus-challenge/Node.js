import { addReview, getUserReviews } from '../repositories/review.repository.js';

export const createReview = async ({ storeId, userId, content, star }) => {
  return await addReview({ storeId, userId, content, star });
};

export const fetchUserReviews = async (userId) => {
  return await getUserReviews(userId);
};
