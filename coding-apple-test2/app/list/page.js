import { connectDB } from '@/util/database'

export default async function List() {
  const db = (await connectDB).db('coding-apple-test2')
  let result = await db.collection('post').find().toArray()
  console.log(result)

  return (
    <div className="list-bg">
      {result.map((e, idx) => {
        return (
          <div className="list-item">
            <h4>{result[idx].title}</h4>
            <p>{result[idx].content}</p>
          </div>
        )
      })}
    </div>
  )
}
