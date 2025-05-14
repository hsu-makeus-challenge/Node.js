import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";


export const addReview = async (data) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
  
      const insertQuery = `
        INSERT INTO review (text, rating, user_id, store_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW());
      `;
      const [insertResult] = await conn.query(insertQuery, [
        data.text,
        data.rating,
        data.userId,
        data.storeId,
      ]);
  
      const [review] = await conn.query(
        `SELECT id, text, rating, created_at, updated_at
         FROM review
         WHERE id = ?`,
        [insertResult.insertId]
      );
  
      await conn.commit();
      return review[0];
    } catch (err) {
      await conn.rollback();
      throw new Error(`리뷰 등록 실패: ${err.message}`);
    } finally {
      conn.release();
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
      throw new Error(`리뷰 조회 실패: ${err.message}`);
    }
  };