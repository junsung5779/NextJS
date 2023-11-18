/**
 * auto routing : pages/api/test.js 처럼 폴더와 파일을 만들어 놓으면
 * /api/test로 GET/POST/PUT/DELETE/PATCH 요청하면
 * 파일안의 코드 실행해줌
 */

export default function handler(request, response) {
  // 요청 TYPE에 따라 분기처리
  if (request.method == 'POST') {
    // 서버가 요청을 받으면 처리 후 응답을 보내야 함.
    /**
     * 서버기능 처리코드 종류
     * 성공: 200
     * 실패: 500
     * 유저 잘못으로 인한 실패: 400
     */
    return response.status(200).json('POST TYPE 으로 받은 요청에 대한 응답 처리완료')
  } else {
    return response.status(400).json('POST TYPE 이 아닌 응답을 받음')
  }
}
