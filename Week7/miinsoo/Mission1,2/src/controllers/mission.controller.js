import { StatusCodes } from "http-status-codes";  
import { bodyToAddMission, bodyToChallengeMission } from "../dtos/mission.dto.js";  
import { 
  addMission as addMissionService, 
  challengeMission as challengeMissionService,
  showStoreMission as showStoreMissionService,
  showUserMission as showUserMissionService 
} from "../services/mission.service.js";  

export const addStoreMission = async (req, res, next) => {
    const { storeId } = req.params;
    console.log("미션 추가");
    console.log("body:", req.body);

    const mission = await addMissionService(bodyToAddMission(req.body, storeId));
    res.status(StatusCodes.CREATED).json({ result: mission });
}

export const challengeStoreMission = async (req, res, next) => {
    console.log("미션 도전");
    console.log("body:", req.body);

    const { missionId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "사용자를 찾을 수 없습니다." });
    }

    const mission = await challengeMissionService({ missionId, userId });
    res.status(StatusCodes.CREATED).json({
        result: {
            missionId,
            userId,
            status: '진행중'
        }
    });
}

export const showStoreMission = async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.storeId, 10);
      const mission = await showStoreMissionService(storeId);
      res.status(200).json({ result: convertBigIntToString(mission) });
    } catch (err) {
      next(err);
    }
  };

export const showUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const mission = await showUserMissionService(userId);
    res.status(200).json({ result: convertBigIntToString(mission) });
  } catch (err) {
    next(err);
  }
};