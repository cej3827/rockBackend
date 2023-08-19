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