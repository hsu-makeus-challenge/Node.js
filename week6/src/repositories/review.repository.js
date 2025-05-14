import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addReview = async ({ storeId, userId, content, star }) => {
  return await prisma.review.create({
    data: { storeId, userId, content, star }
  });
};

export const getUserReviews = async (userId) => {
  return await prisma.review.findMany({ where: { userId } });
};
