// import { responseFromMission } from "../dtos/mission.dto.js";
import {
    addMission as addMissionRepo,
    challengeMission as challengeMissionRepo,
  } from "../repositories/mission.repository.js";

export const addMission = async (data) => {
  const missionId = await addMissionRepo({
    content: data.content,
    deadline: data.deadline,
    point: data.point,
    storeId: data.storeId,
  });

  if (!missionId) {
    throw new Error("미션 추가에 실패했습니다.");
  }

  return { missionId };
};

export const challengeMission = async (data) => {
    const challengeId = await challengeMissionRepo({
      userId: data.userId,
      missionId: data.missionId,
    });
  
    if (!challengeId) {
      throw new Error("미션 도전 등록에 실패했습니다.");
    }
  
    return { challengeId };
  };