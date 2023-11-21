import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function Detail(props) {
  const db = (await connectDB).db('todo-DB')
  let result = await db.collection('todo-tbl').findOne({ _id: new ObjectId(props.params.id) })
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>실행 요일: {result.day_of_week}</h4>
      <h4>실행 제목: {result.title}</h4>
      <h4>실행 내용{result.content}</h4>
    </div>
  )
}
