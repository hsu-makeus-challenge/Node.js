// 내가 진행중, 진행 완료한 미션 모아서 보는 쿼리(페이징 포함)
SELECT
    m.id AS mission_id,
    s.name AS store_name,
    m.point,
    m.content AS mission_description,
    m.status AS mission_status,
    CASE 
        WHEN m.status = '진행중' THEN '진행중'
        WHEN m.status = '완료' THEN '완료'
        ELSE '기타'
    END AS mission_state
FROM mission m
JOIN store s ON m.store_id = s.id
LEFT JOIN review r ON r.store_id = s.id AND r.user_id = '사용자 id'
WHERE m.user_id = '사용자 id'
ORDER BY m.updated_at DESC;
LIMIT 10 OFFSET 0;

// 리뷰 작성하는 쿼리
INSERT INTO review(user_id, store_id, content, star)
VALUES (
	(SELECT id FROM user WHERE name = '사용자 이름' LIMIT 1),
	(SELECT id FROM store WHERE name = '가게 이름' LIMIT 1),
	'리뷰 내용',
	5
);

// 홈 화면 쿼리 (현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)
SELECT
    m.id AS mission_id,
    s.name AS store_name,
    fc.type AS food_category,
    m.content AS mission_description,
    m.point AS reward_point,
    DATEDIFF(m.deadline, NOW()) AS days_left,
    m.status AS mission_status
FROM mission m
JOIN store s ON m.store_id = s.id
JOIN food_category fc ON s.food_category_id = fc.id
LEFT JOIN review r ON r.store_id = s.id AND r.user_id = '사용자 id'
WHERE
    s.region = '지역'
    AND m.user_id = '사용자 id'
    AND m.status = '진행중'
    AND m.deadline >= CURDATE()
ORDER BY m.deadline ASC
LIMIT 10 OFFSET 0;

// 마이 페이지 화면 쿼리
SELECT * FROM user WHERE id = '사용자 id';