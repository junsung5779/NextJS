import { connectDB } from '@/util/database'
import Link from 'next/link'
import DetailLink from './DetailLink'

export default async function List() {
  const db = (await connectDB).db('coding-apple-test2')
  let result = await db.collection('post').find().toArray()
  console.log(result)

  return (
    <div className="list-bg">
      {result.map((e, idx) => {
        return (
          <div className="list-item" key={idx}>
            {/* 일부 컴포넌트에만 prefetch 기능을 사용하고 싶으면 prefetch={false} */}
            {/* 개발중일 땐 prefetch 여부 확인불가 -> 사이트 발행 시 확인 가능*/}
            <Link prefetch={false} href={`/detail/${result[idx]._id}`}>
              <h4>{result[idx].title}</h4>
              <p>{result[idx].content}</p>
            </Link>
            <DetailLink />
          </div>
        )
      })}
    </div>
  )
}
