### 홈화면
#### API Endpoint
GET /users/home
#### Request Body
필요없음
#### Request Header
Authorization : accessToken (String)
#### Qeury String
GET /users/home/?stutus=ready

### 마이페이지 리뷰 작성
#### API Endpoint
POST /users/reviews/{review-id}
#### Request Body
{
    "star" : "5",
    "text" : "맛있어요",
    "review_img : "PPP.png"
}
#### Request Header
Authorization : accessToken (String)

### 미션 성공 누르기(진행중, 진행 완료)
#### API Endpoint
PUT /users/missions/{mission-id}
#### Request Body
{
"status" : "completed"
}
#### Qeury String**
status=completed

### 회원 가입 하기
#### API Endpoint
POST /users/signup
#### Request Body
{
    "content": "약관 내용",
	"essential": true
	"name" : "채민수",
	"address" : "OO아파트...",
    "region" : "상암동",
    "gender" : True
	"food_type" : "치킨",
}
