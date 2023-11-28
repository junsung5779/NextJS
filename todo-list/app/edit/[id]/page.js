import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function Edit(props) {
  const db = (await connectDB).db('todo-DB')
  let result = await db.collection('todo-tbl').findOne({ _id: new ObjectId(props.params.id) })

  return (
    <div className="p-20">
      <h4>글 수정 페이지</h4>
      <form action="/api/post/edit" method="POST">
        {/* id값 넘길 땐 주의 */}
        <input style={{ display: 'none' }} name="_id" defaultValue={result._id.toString()} />
        <div>
          <p>요일선택</p>
          <select name="day_of_week" className="select" defaultValue={result.day_of_week}>
            <option value="월">월</option>
            <option value="화">화</option>
            <option value="수">수</option>
            <option value="목">목</option>
            <option value="금">금</option>
            <option value="토">토</option>
            <option value="일">일</option>
          </select>
        </div>
        <input name="title" placeholder="글제목" defaultValue={result.title} />
        <input name="content" placeholder="글내용" defaultValue={result.content} />
        <button type="submit">수정</button>
      </form>
    </div>
  )
}
