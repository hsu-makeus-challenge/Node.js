import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const addMission = async (data) => {
    const conn = await pool.getConnection();
  
    try {
        await conn.beginTransaction();

        const [storeCheck] = await conn.query(
          `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) AS isExistStore;`,
          [data.storeId]
        );
    
        if (!storeCheck[0].isExistStore) {
          throw new Error("존재하지 않는 가게입니다.");
        }
  
        const [insertResult] = await conn.query(
            `INSERT INTO mission (content, deadline, point, store_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW());`,
            [data.content, data.deadline, data.point, data.storeId]
        );
  
        const missionId = insertResult.insertId;

        const [missionRows] = await conn.query(
            `SELECT id, content, deadline, point, status, created_at, updated_at FROM mission WHERE id = ?;`,
            [missionId]
        );

        await conn.commit();
        return missionRows[0];
    } catch (err) {
        await conn.rollback();
        throw new Error(`미션 추가 실패: ${err.message}`);
    } finally {
      conn.release();
    }
  };

  export const challengeMission = async ({ userId, missionId }) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
  
      const [userCheck] = await conn.query(
        `SELECT EXISTS(SELECT 1 FROM user WHERE id = ?) AS isExistUser;`,
        [userId]
      );
      if (!userCheck[0].isExistUser) {
        throw new Error("존재하지 않는 사용자입니다.");
      }
  
      const [missionCheck] = await conn.query(
        `SELECT status FROM mission WHERE id = ?;`,
        [missionId]
      );
      if (missionCheck.length === 0) {
        throw new Error("존재하지 않는 미션입니다.");
      }
      if (missionCheck[0].status !== "대기중") {
        throw new Error("이미 도전 중이거나 완료된 미션입니다.");
      }
  
      await conn.query(
        `UPDATE mission 
         SET status = '진행 중', user_id = ?, updated_at = NOW() 
         WHERE id = ?;`,
        [userId, missionId]
      );
  
      await conn.commit();
      return missionId;
    } catch (err) {
      await conn.rollback();
      throw new Error(`미션 도전 실패: ${err.message}`);
    } finally {
      conn.release();
    }
  };

  export const showStoreMission = async (storeId) => {
    return await prisma.mission.findMany({
      where: { store_id },
      select: {
        id: true,
        content: true,
        deadline: true,
        point: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
    });
  };
  
  export const showUserMission = async (userId) => {
    return await prisma.mission.findMany({
      where: {
        user_id,
        status: '진행중',
      },
      select: {
        id: true,
        status: true,
        content: true,
        deadline: true,
        point: true,
        store: {
          select: {
            name: true,
          }
        },
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  };