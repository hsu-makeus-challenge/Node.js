#내가 진행중, 진행 완료한 미션 모아서 보는 쿼리
SELECT 
  um.id AS user_mission_id,
  s.name AS store_name,
  m.mission_spec,
  m.reward,
  um.status
FROM user_mission um
JOIN mission m ON um.mission_id = m.id
JOIN store s ON m.store_id = s.id
WHERE um.user_id = 1
  AND (um.status = '진행중' OR um.status = '성공')
ORDER BY um.id DESC;



#리뷰작성 쿼리 
INSERT INTO review (user_id, store_id, content, star)
VALUES (1, 101, '음 너무 맛있어요 포인트도 얻고 맛있는 맛집도 알게 된 것 같아 너무나도 행복한 식사였습니다. 다음에 또 올게요!!', 5);


#홈 화면 쿼리 (현재 선택 된 지역에서 도전이 가능한 미션 목록) 
SELECT m.id AS mission_id, s.name AS store_name, m.reward, m.mission_spec
FROM mission m
JOIN store s ON m.store_id = s.id
WHERE s.region = '안암동';

#마이 페이지 화면 쿼리 
SELECT name, email, point
FROM user
WHERE user_id = 1;
