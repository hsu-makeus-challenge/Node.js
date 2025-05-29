import { StatusCodes } from "http-status-codes";
import { bodyToAddMission, bodyToChallengeMission } from "../dtos/mission.dto.js";
import {
    addMission as addMissionService,
    challengeMission as challengeMissionService,
    showStoreMission as showStoreMissionService,
    showUserMission as showUserMissionService
} from "../services/mission.service.js";
import {convertBigIntToString} from "../typeConfig.js"

export const addStoreMission = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    console.log("미션 추가");
    console.log("body:", req.body);

    const mission = await addMissionService(bodyToAddMission(req.body, storeId));
    res.status(StatusCodes.CREATED).success(convertBigIntToString(mission));
  } catch (err) {
    next(err);
  }
}

export const challengeStoreMission = async (req, res, next) => {
  try {
    console.log("미션 도전");
    console.log("body:", req.body);

    const { missionId } = req.params;
    const { userId } = req.body;

    const mission = await challengeMissionService({ missionId, userId });

    res.status(StatusCodes.CREATED).success({
      missionId,
      userId,
      status: "진행중"
    });
  } catch (err) {
    next(err);
  }
}

export const showStoreMission = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const mission = await showStoreMissionService(storeId);
    res.status(StatusCodes.OK).success(convertBigIntToString(mission));
  } catch (err) {
    next(err);
  }
};

export const showUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const mission = await showUserMissionService(userId);
    res.status(StatusCodes.OK).success(convertBigIntToString(mission));
  } catch (err) {
    next(err);
  }
};