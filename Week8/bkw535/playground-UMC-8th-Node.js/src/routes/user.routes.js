import express from "express";
import { handleUserSignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/signup",
  /*
    #swagger.tags = ['Users']
    #swagger.summary = '사용자 회원가입'
    #swagger.description = '유저 정보를 받아 회원가입을 처리합니다.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    foodCategoryId: { type: "integer" }
                  }
                }
              }
            },
            required: ["email", "name", "gender", "birth", "phoneNumber"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: '회원가입 성공',
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserResponse"
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: '필수값 누락 혹은 잘못된 요청 형식',
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
    #swagger.responses[409] = {
      description: '이메일 중복',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "이미 존재하는 이메일입니다." }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: '서버 내부 오류',
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
  handleUserSignUp
);

export default router;