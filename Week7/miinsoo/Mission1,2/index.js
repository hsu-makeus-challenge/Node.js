import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./src/controllers/user.controller.js";
import {addStore} from "./src/controllers/store.controller.js";
import {addReview} from "./src/controllers/review.controller.js";
import {addStoreMission} from "./src/controllers/mission.controller.js";
import {challengeStoreMission} from "./src/controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
// 5주차
// 특정 지역에 가게 추가하기
app.post("/api/v1/stores/register/:regionId", addStore);
// 가게에 리뷰 추가하기
app.post("/api/v1/reviews/stores/:storeId", addReview);
// 가게에 미션 추가하기
app.post("/api/v1/missions/stores/:storeId", addStoreMission);
// 가게의 미션을 도전 중인 미션에 추가하기
app.post("/api/v1/missions/:missionId/challenges", challengeStoreMission);

// 6주차
// 내가 작성한 리뷰 목록
app.get("/api/v1/reviews/users/:userId", showUserReview);
// 특정 가게의 미션 목록
app.get("/api/v1/missions/stores/:storeId", showStoreMission);
// 내가 진행 중인 미션 목록
app.get("/api/v1/missions/users/:userId", showUserMission);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});