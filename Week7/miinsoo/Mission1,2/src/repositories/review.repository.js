import { prisma } from "../db.config.js";


export const addReview = async (data) => {
  try {
    const review = await prisma.review.create({
      data: {
        text: data.text,
        rating: data.rating,
        user: { connect: { id: data.userId } },
        store: { connect: { id: data.storeId } },
      },
      select: {
        id: true,
        text: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return review;
  } catch (err) {
    throw new ReviewTransactionError("리뷰 등록 실패", { originalError: err });
  }
};

  export const showUserReview = async (user_id) => {
    try {
      const reviews = await prisma.review.findMany({
        where: { user_id },
        select: {
          id: true,
          text: true,
          rating: true,
          created_at: true,
          store: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
  
      return reviews;
    } catch (err) {
      throw new ReviewTransactionError("리뷰 조회 실패", {
        userId,
        originalError: err,
      });
    }
  };