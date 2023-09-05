/**
 * @swagger
 *  /group:
 *    post:
 *      tags:
 *      - 메인 화면
 *      summary: '메인 화면'
 *      description: body에 그룹ID넣어서 보내줘
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Group'
 * 
 * @swagger
 *  /group/create:
 *    post:
 *      tags:
 *      - 그룹 생성
 *      summary: '그룹 생성'
 *      description: 그룹 생성 성공 메시지
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              group_Name:
 *                type: string
 *                description: "그룹 이름"
 *              group_IMG:
 *                type: string
 *                description: "그룹 이미지"
 *              user_ID:
 *                type: string
 *                description: "사용자 아이디"
 *              color_Key:
 *                type: string
 *                description: "그룹 색상"
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createGroup'
 * @swagger
 *  /group/member:
 *    post:
 *      tags:
 *      - 멤버 생성
 *      summary: '멤버 생성'
 *      description: 멤버 생성 성공 메시지, insertedGroupId(groupID값) 반환
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              group_ID:
 *                type: string
 *                description: "그룹 아이디"
 *              user_ID:
 *                type: string
 *                description: "사용자 아이디"
 *              user_NAME:
 *                type: string
 *                description: "멤버 이름"
 *              color:
 *                type: string
 *                description: "멤버 색상"
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createMember'
 * 
 * @swagger
 *  /group/code:
 *    post:
 *      tags:
 *      - 그룹 코드 생성
 *      summary: '그룹 코드 생성'
 *      description: 그룹 코드
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              group_ID:
 *                type: integer
 *                description: "그룹 아이디"
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createGroupCode'
 * 
 * @swagger
 *  /group/load:
 *    post:
 *      tags:
 *      - 그룹 접속
 *      summary: '그룹 접속하기'
 *      description: 그룹 코드
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              group_ID:
 *                type: integer
 *                description: "그룹 아이디"
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/loadGroup'
 * 
 * @swagger
 *  /user:
 *    post:
 *      tags:
 *      - 로그인 성공시 user이 접속하고 있는 그룹 불러오기
 *      summary: '접속된 그룹'
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              user_ID:
 *                type: integer
 *                description: "사용자 아이디"
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 * 
 * @swagger
 *  /user/login:
 *    post:
 *      tags:
 *      - 로그인
 *      summary: '로그인'
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              user_ID:
 *                type: string
 *                description: 사용자 아이디
 *              user_PW:
 *                type: string
 *                description: 사용자 비밀번호
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/loginUser'
 * 
 * @swagger
 *  /user/signup:
 *    post:
 *      tags:
 *      - 회원 가입
 *      summary: '회원 가입'
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              user_ID:
 *                type: string
 *                description: 사용자 아이디
 *              user_PW:
 *                type: string
 *                description: 사용자 비밀번호
 *              user_PHONE:
 *                type: string
 *                description: 사용자 전화번호
 *              user_BIRTHDAY:
 *                type: string
 *                description: 사용자 생년월일
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/signupUser'
 * 
 * @swagger
 *  /calender/{month}:
 *    post:
 *      tags:
 *      - 캘린더 일정 불러오기
 *      summary: '캘린더 월마다 불러오기'
 *      parameters:
 *       - name: month
 *         in: path
 *         required: true
 *         description: '조회하려는 월 (예: 8)'
 *         schema:
 *           type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              group_ID:
 *                type: integer
 *                description: 그룹 아이디
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Calender'
 * 
 *  @swagger
 *  /calender/add-plan:
 *    post:
 *      tags:
 *      - 일정 추가
 *      summary: '일정 추가'
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              sche_DETAIL:
 *                type: string
 *                description: 일정 내용
 *              sche_START:
 *                type: datetime
 *                description: 일정 시작일
 *              sche_FINISH:
 *                type: datetime
 *                description: 일정 종료일
 *              group_ID:
 *                type: integer
 *                description: 그룹 아이디
 *              sche_TYPE:
 *                type: integer
 *                description: 일정 타입(0:그룹, 1:개인)
 *              member_ID:
 *                type: integer
 *                description: 멤버 아이디
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calenderAdd'
 * 
 * @swagger
 * /question:
 *   post:
 *     tags:
 *     - 질문 리스트
 *     summary: '답변된 질문 리스트'
 *     description:
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              group_ID:
 *                type: integer
 *                description: "그룹 아이디"
 *     responses:
 *       "200":
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 * 
 * @swagger
 *  /question/{num}:
 *    get:
 *      tags:
 *      - 질문 답변 불러오기
 *      summary: '질문 답변 불러오기'
 *      description:
 *      parameters:
 *       - name: num
 *         in: path
 *         required: true
 *         description: '조회하려는 질문 번호 (예: 8)'
 *         schema:
 *           type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               group_ID:
 *                 type: integer
 *                 description: "그룹 아이디"
 *      responses:
 *        "200":
 *         description: 성공
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/questionList' 
 * 
 * @swagger
 *  /todayQuestion/update:
 *    post:
 *      tags:
 *      - 다음 질문
 *      summary: '다음 질문'
 *      description: body 그룹ID 넣어 보내주면 다음 질문으로 넘어가게 
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/todayQuestion'
 * 
 *  @swagger
 *  /todayQuestion/save-answer:
 *    post:
 *      tags:
 *      - 답변하기
 *      summary: '답변하기'
 *      description: body에 넣어야 할 거 - 질문 번호, 답변 내용, 멤버 아이디, 그룹 아이디
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Answer'
 */