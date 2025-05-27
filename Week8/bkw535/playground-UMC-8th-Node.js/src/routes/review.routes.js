import express from "express";
import { addReview, addPhotoReview, showUserReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post(
  "/stores/:storeId",
  /*
    #swagger.tags = ['Reviews']
    #swagger.summary = '가게에 리뷰 추가'
    #swagger.description = 'storeId에 해당하는 가게에 리뷰를 추가합니다.'
    #swagger.parameters['storeId'] = { description: '가게 ID', required: true, type: 'integer' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" },
              content: { type: "string" },
              star: { type: "number" }
            },
            required: ["userId", "content", "star"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: '리뷰 등록 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reviewId: { type: "integer", example: 123 }
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
      description: '리뷰 ID 생성 실패 또는 서버 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "reviewId가 없습니다." }
            }
          }
        }
      }
    }
  */
  addReview
);

router.post(
  "/photo",
  /*
    #swagger.tags = ['Reviews']
    #swagger.summary = '리뷰에 사진 추가'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              photoUrl: { type: "string" },
              reviewId: { type: "integer" }
            },
            required: ["photoUrl", "reviewId"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: '사진 리뷰 등록 성공',
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
  addPhotoReview
);

router.get(
  "/users/:userId",
  /*
    #swagger.tags = ['Reviews']
    #swagger.summary = '유저가 작성한 리뷰 조회'
    #swagger.parameters['userId'] = {
      description: '유저 ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: '리뷰 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                reviewId: { type: "integer" },
                content: { type: "string" },
                star: { type: "number" },
                createdAt: { type: "string", format: "date-time" },
                // 등등 필요한 필드
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: '유저 ID 누락 또는 유효하지 않음',
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
  showUserReview
);

export default router;