import { prisma } from "../db.config.js";

export const addReview = async (data) => {
  try {
    const review = await prisma.review.create({
      data: {
        content: data.content,
        star: data.star,
        user: { connect: { id: data.userId } },
        store: { connect: { id: data.storeId } },
      },
      select: {
        id: true,
        content: true,
        star: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return review;
  } catch (err) {
    throw new ReviewTransactionError("리뷰 등록 실패", { originalError: err });
  }
};

export const showUserReview = async (userId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { userId },
      select: {
        id: true,
        content: true,
        star: true,
        createdAt: true,
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