import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMissionsByStoreId = async (storeId) => {
  return await prisma.mission.findMany({ where: { storeId } });
};

export const getMissionsByUserId = async (userId) => {
  return await prisma.mission.findMany({ where: { userId, completed: false } });
};

export const completeMission = async (missionId, userId) => {
  return await prisma.mission.updateMany({
    where: { id: missionId, userId },
    data: { completed: true }
  });
};

// ==========================
// 📌 가게 존재 여부 확인
// ==========================
export const checkStoreExists = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });
  return !!store; // 존재하면 true, 없으면 false
};


// 미션 추가
export const addMissionToDB = async (storeId, { title, description }) => {
  return await prisma.mission.create({
    data: {
      storeId: storeId,
      title: title,
      description: description
    }
  });
};

export const checkMissionChallenge = async (missionId, userId) => {
  return await prisma.userMission.findFirst({
    where: { missionId, userId }
  });
};

export const addChallengeToDB = async (missionId, userId) => {
  return await prisma.userMission.create({
    data: { missionId, userId }
  });
};

