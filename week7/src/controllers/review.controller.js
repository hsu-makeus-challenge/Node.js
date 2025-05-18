import { createReview, fetchUserReviews } from '../services/review.service.js';
import { BadRequestError } from '../errors/customErrors.js'; // ✅ 필요 시

export const postReview = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { userId, content, star } = req.body;

    const review = await createReview({
      storeId: parseInt(storeId, 10),
      userId,
      content,
      star,
    });

    res.status(201).success({ review });
  } catch (error) {
    next(
      new BadRequestError("리뷰 등록 중 오류 발생", {
        storeId: req.params.storeId,
        error: error.message,
      })
    );
  }
};

export const getMyReviews = async (req, res, next) => {
  try {
    const userId = parseInt(req.query.userId, 10);
    const reviews = await fetchUserReviews(userId);

    res.success({ reviews });
  } catch (error) {
    next(
      new BadRequestError("리뷰 목록 조회 중 오류 발생", {
        userId: req.query.userId,
        error: error.message,
      })
    );
  }
};
