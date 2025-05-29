// import { responseFromMission } from "../dtos/mission.dto.js";
import {
    addMission as addMissionRepo,
    challengeMission as challengeMissionRepo,
    showStoreMission as showStoreMissionRepo,
    showUserMission as showUserMissionRepo
  } from "../repositories/mission.repository.js";

export const addMission = async (data) => {
  const missionId = await addMissionRepo({
    content: data.content,
    deadline: data.deadline,
    point: data.point,
    storeId: data.storeId,
  });

  if (!missionId) {
    throw new MissionIdNotFoundError("missionId가 없습니다.", data);
  }

  return { missionId };
};

export const challengeMission = async (data) => {
    const challengeId = await challengeMissionRepo({
      userId: data.userId,
      missionId: data.missionId,
    });
  
    if (!challengeId) {
      throw new ChallengeIdNotFoundError("challengeId가 없습니다.", data);
    }
  
    return { challengeId };
  };

export const showStoreMission = async (storeId) => {
    if (!storeId) throw new StoreIdNotFoundError("storeId가 없습니다.", data);
    return await showStoreMissionRepo(storeId);
};
  
export const showUserMission = async (userId) => {
    if (!userId) {
      throw new UserIdNotFoundError("userId가 없습니다.", data);
    }
    return await showUserMissionRepo(userId);
};