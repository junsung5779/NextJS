import { connectDB } from '@/util/database'
import Link from 'next/link'

export default async function List() {
  const db = (await connectDB).db('coding-apple-test2')
  let result = await db.collection('post').find().toArray()
  console.log(result)

  return (
    <div className="list-bg">
      {result.map((e, idx) => {
        return (
          <div className="list-item" key={idx}>
            <Link href={`/detail/${result[idx]._id}`}>
              <h4>{result[idx].title}</h4>
              <p>{result[idx].content}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
