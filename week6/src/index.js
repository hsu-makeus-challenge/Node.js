import express from 'express';
import { getMyReviews, postReview } from './controllers/review.controller.js';
import { 
  getMissionsByStore, 
  getMyMissions, 
  completeMyMission, 
  postMission 
} from './controllers/mission.controller.js';
import { addUser, getUser, setPreference, getUserPreferencesByUserId } from './repositories/user.repository.js';
import { handleCreateStore } from './controllers/store.controller.js';
import { challengeMissionHandler } from './controllers/mission.controller.js';
const app = express();
app.use(express.json());

// ==========================
// 📌 루트 경로 추가 (Welcome 페이지)
// ==========================
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
      <li>POST /api/v1/stores</li> <!-- ✅ 새로 추가된 부분 -->
    </ul>
  `);
});

// ==========================
// 📌 User 관련 API
// ==========================
app.post('/api/v1/users', async (req, res) => {
  try {
    const userId = await addUser(req.body);
    if (!userId) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    res.status(201).json({ userId });
  } catch (error) {
    console.error("사용자 생성 실패:", error.message);
    res.status(500).json({ message: "사용자 생성 중 오류 발생" });
  }
});

// ➡️ 사용자 정보 조회
app.get('/api/v1/users/:userId', async (req, res) => {
  try {
    const user = await getUser(parseInt(req.params.userId, 10));
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("사용자 조회 실패:", error.message);
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
});

// ➡️ 음식 선호 카테고리 설정
app.post('/api/v1/users/:userId/preferences', async (req, res) => {
  try {
    await setPreference(parseInt(req.params.userId, 10), req.body.foodCategoryId);
    res.status(201).json({ message: "Preference added successfully." });
  } catch (error) {
    console.error("선호 카테고리 설정 실패:", error.message);
    res.status(500).json({ message: "선호 카테고리 설정 중 오류 발생" });
  }
});

// ➡️ 사용자 선호 카테고리 목록 조회
app.get('/api/v1/users/:userId/preferences', async (req, res) => {
  try {
    const preferences = await getUserPreferencesByUserId(parseInt(req.params.userId, 10));
    res.status(200).json({ data: preferences });
  } catch (error) {
    console.error("선호 카테고리 조회 실패:", error.message);
    res.status(500).json({ message: "선호 카테고리 조회  중 오류 발생" });
  }
});

// ==========================
// 📌 Mission 및 Review 관련 API
// ==========================
app.post('/api/v1/stores/:storeId/reviews', postReview);
app.get('/api/v1/reviews/my', getMyReviews);
app.get('/api/v1/stores/:storeId/missions', getMissionsByStore);
app.get('/api/v1/missions/my', getMyMissions);
app.patch('/api/v1/missions/:missionId/complete', completeMyMission);
app.post('/api/v1/stores/:storeId/missions', postMission);
app.post('/api/v1/missions/:missionId/challenge', challengeMissionHandler);

// ✅ 수정된 부분
app.post('/api/v1/stores', handleCreateStore); 

// ==========================
// 📌 Server 실행
// ==========================
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
