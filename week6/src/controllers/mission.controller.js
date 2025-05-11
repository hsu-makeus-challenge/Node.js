import { fetchMissionsByStore, fetchMyMissions, finishMission } from '../services/mission.service.js';

export const getMissionsByStore = async (req, res) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const missions = await fetchMissionsByStore(storeId);
    res.status(200).json({ data: missions });
  } catch (error) {
    console.error("미션 목록 조회 실패:", error.message);
    res.status(500).json({ message: "미션 목록 조회 중 오류 발생" });
  }
};

export const getMyMissions = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId, 10);
    const missions = await fetchMyMissions(userId);
    res.status(200).json({ data: missions });
  } catch (error) {
    console.error("내 미션 목록 조회 실패:", error.message);
    res.status(500).json({ message: "내 미션 목록 조회 중 오류 발생" });
  }
};

export const completeMyMission = async (req, res) => {
  try {
    const missionId = parseInt(req.params.missionId, 10);
    const userId = parseInt(req.body.userId, 10);
    const result = await finishMission(missionId, userId);
    res.status(200).json({ message: "미션 완료 처리되었습니다.", data: result });
  } catch (error) {
    console.error("미션 완료 처리 실패:", error.message);
    res.status(500).json({ message: "미션 완료 처리 중 오류 발생" });
  }
};

import { addMissionToStore } from '../services/mission.service.js';

export const postMission = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { title, description } = req.body;

    const result = await addMissionToStore(parseInt(storeId), { title, description });

    if (!result) {
      return res.status(404).json({ message: "가게를 찾을 수 없습니다." });
    }

    res.status(201).json({ message: "미션이 추가되었습니다.", data: result });
  } catch (error) {
    console.error("미션 추가 실패:", error.message);
    res.status(500).json({ message: "미션 추가 중 오류 발생" });
  }
};

import { challengeMission } from '../services/mission.service.js';

export const challengeMissionHandler = async (req, res) => {
  try {
    const { missionId } = req.params;
    const { userId } = req.body;

    const result = await challengeMission(parseInt(missionId), parseInt(userId));

    if (!result) {
      return res.status(409).json({ message: "이미 도전 중인 미션입니다." });
    }

    res.status(201).json({ message: "미션 도전 성공", data: result });
  } catch (error) {
    console.error("미션 도전 실패:", error.message);
    res.status(500).json({ message: "미션 도전 중 오류 발생" });
  }
};

