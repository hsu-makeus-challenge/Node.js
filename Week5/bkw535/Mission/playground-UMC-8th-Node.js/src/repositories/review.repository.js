import { pool } from "../db.config.js";

export const addReview = async (data) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
  
      const insertQuery = `
        INSERT INTO review (content, star, user_id, store_id)
        VALUES (?, ?, ?, ?);
      `;
      const [insertResult] = await conn.query(insertQuery, [
        data.content,
        data.star,
        data.userId,
        data.storeId,
      ]);
  
      const [review] = await conn.query(
        `SELECT id, content, star, created_at, updated_at
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