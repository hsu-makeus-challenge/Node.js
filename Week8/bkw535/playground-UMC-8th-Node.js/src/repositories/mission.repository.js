import { prisma } from "../db.config.js";

export const addMission = async (data) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 가게 존재 여부 확인
      const store = await tx.store.findUnique({
        where: { id: data.storeId },
        select: { id: true },
      });

      if (!store) {
        throw new StoreIdNotFoundError("존재하지 않는 가게입니다.", { storeId: data.storeId });
      }

      // 미션 생성
      const mission = await tx.mission.create({
        data: {
          content: data.content,
          deadline: new Date(data.deadline),
          point: data.point,
          store: {
            connect: { id: data.storeId },
          },
        },
        select: {
          id: true,
          content: true,
          deadline: true,
          point: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return mission;
    });

    return result;
  } catch (err) {
    if (err instanceof StoreIdNotFoundError) throw err;
    throw new MissionTransactionError("미션 추가 실패", { originalError: err });
  }
};

export const challengeMission = async ({ userId, missionId }) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 사용자 존재 여부 확인
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!user) {
        throw new UserIdNotFoundError("존재하지 않는 사용자입니다.", { userId });
      }

      // 미션 존재 및 상태 확인
      const mission = await tx.mission.findUnique({
        where: { id: missionId },
        select: { status: true },
      });

      if (!mission) {
        throw new MissionIdNotFoundError("존재하지 않는 미션입니다.", { missionId });
      }

      if (mission.status !== "대기 중") {
        throw new MissionStatusInvalidError("이미 도전 중이거나 완료된 미션입니다.", {
          missionId,
          status: mission.status,
        });
      }

      // 미션 상태 업데이트
      await tx.mission.update({
        where: { id: missionId },
        data: {
          status: "진행 중",
          user: { connect: { id: userId } },
        },
      });

      return missionId;
    });

    return result;
  } catch (err) {
    if (
      err instanceof UserIdNotFoundError ||
      err instanceof MissionIdNotFoundError ||
      err instanceof MissionStatusInvalidError
    ) {
      throw err;
    }
    throw new MissionTransactionError("미션 도전 실패", {
      missionId,
      userId,
      originalError: err,
    });
  }
};

export const showStoreMission = async (storeId) => {
  return await prisma.mission.findMany({
    where: { storeId },
    select: {
      id: true,
      content: true,
      deadline: true,
      point: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const showUserMission = async (userId) => {
  return await prisma.mission.findMany({
    where: {
      userId,
      status: '진행 중',
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
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};