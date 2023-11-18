import { connectDB } from '@/util/database'

export default async function handler(request, response) {
  if (request.method == 'GET') {
    const db = (await connectDB).db('coding-apple-test2')
    let result = await db.collection('post').find().toArray()
    return response.status(200).json(result)
  } else {
    return response.status(400).json('잘못된 요청 정보입니다.')
  }
}
