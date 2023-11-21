import { connectDB } from '@/util/database'

export default async function handler(request, response) {
  // 유저 -> DB입력 과 같은 로직으로 코드 짜면 위험하므로
  // 유저 -> 서버(mongoDB server에 요청) -> DB입력 과 같은 과정을 거치도록 개발
  const body = {
    day_of_week: request.body.day_of_week,
    title: request.body.title,
    content: request.body.content,
  }

  if (request.method === 'POST') {
    if (body.title === '' || body.content === '') {
      return response.status(500).json('제목과 내용을 입력하세요')
    }

    try {
      const db = (await connectDB).db('todo-DB')
      // writeConcern: MongoDB에서 데이터 쓰기 작업에 대한 확인 수준을 설정하는 옵션인데
      // mongoDB 기본설정만 하다보니 세팅이 잘 안되어서 명시적으로 설정함.
      // writeConcern을 설정함으로써 특정 수준의 데이터 쓰기 작업에 대한 확인을 요구할 수 있음.
      // 이를 통해 데이터의 안정성과 일관성을 조절할 수 있음.
      // writeConcern에 관한 정보는 https://dlaudtjr03.tistory.com/18
      // insertOne: DB에 document 1개 발행
      let result = await db.collection('todo-tbl').insertOne(body, { writeConcern: { w: 'majority' } })
      // 데이터 삽입 성공 시 리다이렉트
      return response.status(200).redirect(302, '/list')
    } catch (error) {
      // db에 데이터 삽입 실패 시
      return response.status(500).json(error)
    }
  } else {
    // POST 요청이 아닌 경우
    return response.status(400).json('잘못된 요청 정보입니다.')
  }
}
