import {
  fetchMissionsByStore,
  fetchMyMissions,
  finishMission,
  addMissionToStore,
  challengeMission
} from '../services/mission.service.js';

import { NotFoundError, ConflictError } from '../errors/customErrors.js';

// 📌 특정 가게의 미션 목록 조회
export const getMissionsByStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const missions = await fetchMissionsByStore(storeId);
    res.success({ missions });
  } catch (error) {
    next(error);
  }
};

// 📌 내가 진행 중인 미션 목록 조회
export const getMyMissions = async (req, res, next) => {
  try {
    const userId = parseInt(req.query.userId, 10);
    const missions = await fetchMyMissions(userId);
    res.success({ missions });
  } catch (error) {
    next(error);
  }
};

// 📌 내가 진행 중인 미션 완료 처리
export const completeMyMission = async (req, res, next) => {
  try {
    const missionId = parseInt(req.params.missionId, 10);
    const userId = parseInt(req.body.userId, 10);
    const result = await finishMission(missionId, userId);
    res.success({ message: "미션 완료 처리되었습니다.", result });
  } catch (error) {
    next(error);
  }
};

// 📌 가게에 미션 추가
export const postMission = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { title, description } = req.body;

    const result = await addMissionToStore(parseInt(storeId), { title, description });

    if (!result) {
      throw new NotFoundError("가게를 찾을 수 없습니다.", { storeId });
    }

    res.status(201).success({ message: "미션이 추가되었습니다.", result });
  } catch (error) {
    next(error);
  }
};

// 📌 미션 도전하기
export const challengeMissionHandler = async (req, res, next) => {
  try {
    const { missionId } = req.params;
    const { userId } = req.body;

    const result = await challengeMission(parseInt(missionId), parseInt(userId));

    if (!result) {
      throw new ConflictError("이미 도전 중인 미션입니다.", { missionId, userId });
    }

    res.status(201).success({ message: "미션 도전 성공", result });
  } catch (error) {
    next(error);
  }
};
