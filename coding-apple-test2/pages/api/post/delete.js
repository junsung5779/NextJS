import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  // JSON -> Object 변환은 JSON.parse()
  const requestBody = {
    _id: JSON.parse(request.body)._id,
  }
  console.log(new Object(requestBody._id))
  if (request.method === 'DELETE') {
    try {
      const db = (await connectDB).db('coding-apple-test2')
      let result = await db
        .collection('post')
        .deleteOne({ _id: new ObjectId(requestBody._id) }, { writeConcern: { w: 'majority' } })
      if (result.deletedCount === 1) {
        return response.status(200).json('삭제완료')
      } else {
        return response.status(500).redirect(302, '/list')
      }
    } catch {
      return response.status(500).json(error)
    }
  } else {
    return response.status(400).json('잘못된 삭제요청 정보입니다.')
  }
}
