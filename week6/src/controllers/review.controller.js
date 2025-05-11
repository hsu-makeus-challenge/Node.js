import { createReview, fetchUserReviews } from '../services/review.service.js';

export const postReview = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { userId, content, star } = req.body;
    const review = await createReview({ storeId: parseInt(storeId), userId, content, star });
    res.status(201).json({ data: review });
  } catch (error) {
    console.error("리뷰 등록 실패:", error.message);
    res.status(500).json({ message: "리뷰 등록 중 오류 발생" });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId, 10);
    const reviews = await fetchUserReviews(userId);
    res.status(200).json({ data: reviews });
  } catch (error) {
    console.error("리뷰 목록 조회 실패:", error.message);
    res.status(500).json({ message: "리뷰 목록 조회 중 오류 발생" });
  }
};


