import { connectDB } from '@/util/database'

export default async function handler(request, response) {
  // 유저 -> 서버(mongoDB server에 요청) -> DB입력 과 같은 과정을 거치도록 개발하자
  const body = {
    title: request.body.title,
    content: request.body.content,
  }

  if (request.method == 'POST') {
    if (body.title == '') {
      return response.status(500).json('너 제목 왜 안씀?')
    }
    if (body.content == '') {
      return response.status(500).json('너 내용 왜 안씀?')
    }
    try {
      const db = (await connectDB).db('coding-apple-test2')
      // writeConcern에 관한 정보는 https://dlaudtjr03.tistory.com/18
      // insertOne: DB에 document 1개 발행
      let result = await db.collection('post').insertOne(body, { writeConcern: { w: 'majority' } })
      return response.status(200).redirect(302, '/list')
    } catch (error) {
      return response.status(500).json(error)
    }
  } else {
    return response.status(400).json('잘못된 요청 정보입니다.')
  }
}
