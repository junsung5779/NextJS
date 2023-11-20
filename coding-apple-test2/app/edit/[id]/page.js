import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function Edit(props) {
  const db = (await connectDB).db('coding-apple-test2')
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
  // console.log(result)

  // await db.collection('post').updateOne({}, { $set: {title:'바보제목', content: '바보내용'} })

  return (
    <div className="p-20">
      <h4>글 수정 페이지</h4>
      <form action="/api/post/edit" method="POST">
        {/* id값 넘길 땐 주의 */}
        <input style={{ display: 'none' }} name="_id" defaultValue={result._id.toString()} />
        <input name="title" placeholder="글제목" defaultValue={result.title} />
        <input name="content" placeholder="글내용" defaultValue={result.content} />
        <button type="submit">수정</button>
      </form>
    </div>
  )
}
