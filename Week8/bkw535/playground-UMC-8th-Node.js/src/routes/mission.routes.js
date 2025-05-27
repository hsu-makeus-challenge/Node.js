import express from "express";
import {
  addStoreMission,
  challengeStoreMission,
  showStoreMission,
  showUserMission,
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post(
  "/stores/:storeId",
  /*
    #swagger.tags = ['Missions']
    #swagger.summary = '가게에 미션 추가'
    #swagger.parameters['storeId'] = { description: '가게 ID', required: true, type: 'integer' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              content: { type: "string" },
              deadline: { type: "string", format: "date" },
              point: { type: "integer" }
            },
            required: ["content", "deadline", "point"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: '미션 등록 완료',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missionId: { type: "integer", example: 101 }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: '요청 데이터 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "필수 항목이 누락되었습니다." }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'missionId 생성 실패 또는 서버 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "missionId가 없습니다." }
            }
          }
        }
      }
    }
  */
  addStoreMission
);

router.post(
  "/:missionId/challenges",
  /*
    #swagger.tags = ['Missions']
    #swagger.summary = '미션 도전'
    #swagger.parameters['missionId'] = { description: '미션 ID', required: true, type: 'integer' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" }
            },
            required: ["userId"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: '도전 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              challengeId: { type: "integer", example: 202 }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: '요청 데이터 오류 또는 userId 누락',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "userId가 없습니다." }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: 'challengeId 생성 실패 또는 서버 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "challengeId가 없습니다." }
            }
          }
        }
      }
    }
  */
  challengeStoreMission
);

router.get(
  "/stores/:storeId",
  /*
    #swagger.tags = ['Missions']
    #swagger.summary = '특정 가게의 미션 목록 조회'
    #swagger.parameters['storeId'] = { description: '가게 ID', required: true, type: 'integer' }
    #swagger.responses[200] = {
      description: '미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                missionId: { type: "integer" },
                content: { type: "string" },
                deadline: { type: "string", format: "date-time" },
                point: { type: "integer" }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'storeId 누락',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "storeId가 없습니다." }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: '서버 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "서버 오류가 발생했습니다." }
            }
          }
        }
      }
    }
  */
  showStoreMission
);

router.get(
  "/users/:userId",
  /*
    #swagger.tags = ['Missions']
    #swagger.summary = '사용자의 진행 중인 미션 조회'
    #swagger.parameters['userId'] = { description: '유저 ID', required: true, type: 'integer' }
    #swagger.responses[200] = {
      description: '미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                missionId: { type: "integer" },
                content: { type: "string" },
                deadline: { type: "string" },
                point: { type: "integer" },
                status: { type: "string", example: "in-progress" }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'userId 누락',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "userId가 없습니다." }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: '서버 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "서버 오류가 발생했습니다." }
            }
          }
        }
      }
    }
  */
  showUserMission
);

export default router;