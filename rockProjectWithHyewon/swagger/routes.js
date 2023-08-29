/**
 * @swagger
 *  /group:
 *    post:
 *      tags:
 *      - 메인 화면
 *      summary: '메인 화면'
 *      description: 멤버들 닉네임, 답변 여부, 멤버 색상, 모두 답변 했는지 여부, 오늘의 질문
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
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createGroupCode'
 * 
 * @swagger
 *  /user:
 *    post:
 *      tags:
 *      - 시작 화면
 *      summary: '접속된 그룹을 보여줌(로그인 되어있는 경우)'
 *      description: 그룹 이름, 그룹 이미지
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 * 
 * @swagger
 *  /user/signup:
 *    post:
 *      tags:
 *      - 회원 가입
 *      summary: '회원 가입'
 *      description: 회원가입 성공 메시지 전송
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/signupUser'
 * 
 * @swagger
 *  /user/login:
 *    post:
 *      tags:
 *      - 로그인
 *      summary: '로그인'
 *      description: 로스인 성공 메시지 전송
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/loginUser'
 * 
 * @swagger
 *  /calender/{month}:
 *    post:
 *      tags:
 *      - 캘린더 일정 불러오기
 *      summary: '캘린더 월마다 불러오기'
 *      description: 일정 내용, 유저 이름, 스케줄 시작, 스케줄 끝, 스케줄 타입, 스케줄 색상
 *      parameters:
 *       - name: month
 *         in: path
 *         required: true
 *         description: '조회하려는 월 (예: 8)'
 *         schema:
 *           type: integer
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
 *      description: 보내는 값 - 일정 아이디, 일정 내용, 일정 시작일, 일정 종료일, 그룹 아이디, 스케줄 타입(0:그룹, 1:개인), 멤버 아이디
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calenderAdd'
 * 
 * @swagger
 *  /question/{num}:
 *    post:
 *      tags:
 *      - 질문 답변 불러오기
 *      summary: '질문 답변 불러오기'
 *      description: 멤버 닉네임, 질문 내용
 *      parameters:
 *       - name: num
 *         in: path
 *         required: true
 *         description: '조회하려는 질문 번호 (예: 8)'
 *         schema:
 *           type: integer
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/questionList'
 * 
 * @swagger
 *  /question:
 *    post:
 *      tags:
 *      - 질문 리스트
 *      summary: '답변된 질문 리스트'
 *      description: 답변된 질문 리스트
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 * 
 * @swagger
 *  /todayQuestion/update:
 *    post:
 *      tags:
 *      - 다음 질문
 *      summary: '다음 질문'
 *      description:
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
 *      description:
 *      responses:
 *       200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Answer'
 */