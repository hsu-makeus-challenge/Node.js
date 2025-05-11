// ==========================
// 📌 Import Repositories
// ==========================
import { 
    getMissionsByStoreId, 
    getMissionsByUserId, 
    completeMission, 
    checkStoreExists, 
    addMissionToDB,
    checkMissionChallenge,
    addChallengeToDB 
  } from '../repositories/mission.repository.js';
  
  // ==========================
  // 📌 미션 목록 조회 (가게 기준)
  // ==========================
  export const fetchMissionsByStore = async (storeId) => {
    return await getMissionsByStoreId(storeId);
  };
  
  // ==========================
  // 📌 내가 진행 중인 미션 목록 조회
  // ==========================
  export const fetchMyMissions = async (userId) => {
    return await getMissionsByUserId(userId);
  };
  
  // ==========================
  // 📌 미션 완료 처리
  // ==========================
  export const finishMission = async (missionId, userId) => {
    return await completeMission(missionId, userId);
  };
  
  // ==========================
  // 📌 가게에 미션 추가하기
  // ==========================
  export const addMissionToStore = async (storeId, missionData) => {
    const storeExists = await checkStoreExists(storeId);
    if (!storeExists) {
      console.log("❌ 가게가 존재하지 않습니다.");
      return null;
    }
  
    const result = await addMissionToDB(storeId, missionData);
    console.log("✅ 미션이 가게에 추가되었습니다.");
    return result;
  };
  
  // ==========================
  // 📌 미션 도전하기
  // ==========================
  export const challengeMission = async (missionId, userId) => {
    const alreadyChallenged = await checkMissionChallenge(missionId, userId);
    if (alreadyChallenged) {
      console.log("⚠️ 이미 도전한 미션입니다.");
      return null;
    }
  
    console.log("✅ 미션 도전에 성공했습니다.");
    return await addChallengeToDB(missionId, userId);
  };
  