import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  getMyReviews,
  postReview
} from './controllers/review.controller.js';
import {
  getMissionsByStore,
  getMyMissions,
  completeMyMission,
  postMission,
  challengeMissionHandler
} from './controllers/mission.controller.js';
import {
  addUser,
  getUser,
  setPreference,
  getUserPreferencesByUserId
} from './repositories/user.repository.js';
import { handleCreateStore } from './controllers/store.controller.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ 공통 응답 미들웨어
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };
  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };
  next();
});

// ✅ 루트 경로
app.get('/', (req, res) => {
  res.status(200).send(`
    <h2>🚀 Welcome to UMC Node.js API Server!</h2>
    <p>Available Endpoints:</p>
    <ul>
      <li>POST /api/v1/users</li>
      <li>GET /api/v1/users/:userId</li>
      <li>POST /api/v1/users/:userId/preferences</li>
      <li>GET /api/v1/users/:userId/preferences</li>
      <li>POST /api/v1/stores/:storeId/reviews</li>
      <li>GET /api/v1/reviews/my</li>
      <li>GET /api/v1/stores/:storeId/missions</li>
      <li>GET /api/v1/missions/my</li>
      <li>PATCH /api/v1/missions/:missionId/complete</li>
      <li>POST /api/v1/stores/:storeId/missions</li>
      <li>POST /api/v1/stores</li>
      <li>POST /api/v1/missions/:missionId/challenge</li>
    </ul>
  `);
});

// ✅ User API
app.post('/api/v1/users', async (req, res, next) => {
  try {
    const userId = await addUser(req.body);
    if (!userId) return res.error({ reason: 'User already exists.' });
    res.status(201).success({ userId });
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/users/:userId', async (req, res, next) => {
  try {
    const user = await getUser(parseInt(req.params.userId, 10));
    res.success({ user });
  } catch (error) {
    next({ reason: "사용자를 찾을 수 없습니다." });
  }
});

app.post('/api/v1/users/:userId/preferences', async (req, res, next) => {
  try {
    await setPreference(parseInt(req.params.userId, 10), req.body.foodCategoryId);
    res.status(201).success({ message: "Preference added successfully." });
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/users/:userId/preferences', async (req, res, next) => {
  try {
    const preferences = await getUserPreferencesByUserId(parseInt(req.params.userId, 10));
    res.success({ preferences });
  } catch (error) {
    next(error);
  }
});

// ✅ Mission / Review API
app.post('/api/v1/stores/:storeId/reviews', postReview);
app.get('/api/v1/reviews/my', getMyReviews);
app.get('/api/v1/stores/:storeId/missions', getMissionsByStore);
app.get('/api/v1/missions/my', getMyMissions);
app.patch('/api/v1/missions/:missionId/complete', completeMyMission);
app.post('/api/v1/stores/:storeId/missions', postMission);
app.post('/api/v1/missions/:missionId/challenge', challengeMissionHandler);
app.post('/api/v1/stores', handleCreateStore);

// ✅ 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

// ✅ 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
