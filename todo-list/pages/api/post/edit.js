import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  const requestBody = {
    day_of_week: request.body.day_of_week,
    title: request.body.title,
    content: request.body.content,
  }
  if (request.method == 'POST') {
    if (requestBody.title == '' || requestBody.content == '') {
      return response.status(500).json('제목과 내용을 입력하세요')
    }
    try {
      const db = (await connectDB).db('todo-DB')
      // writeConcern에 관한 정보는 https://dlaudtjr03.tistory.com/18
      // updateOne: DB에 document 1개 수정
      let result = await db
        .collection('todo-tbl')
        .updateOne({ _id: new ObjectId(request.body._id) }, { $set: requestBody }, { writeConcern: { w: 'majority' } })
      return response.status(200).redirect(302, '/list')
    } catch (error) {
      return response.status(500).json(error)
    }
  } else {
    return response.status(400).json('잘못된 요청 정보입니다.')
  }
}
