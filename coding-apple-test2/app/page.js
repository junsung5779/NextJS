import { connectDB } from '/util/database.js'

export default async function Home() {
  // Mongode connect
  const db = (await connectDB).db('coding-apple-test2')
  let result = await db.collection('post').find().toArray()
  /**
   * client component 내의 code는 user browser로 전달되기 때문에
   * 해당 페이지를 사용하는 모든 user 들이 DB I/O code를 볼 수 있다.
   * 따라서 DB I/O code는 server component 안에서만 쓰자.
   */
  return (
    <main>
      <div>
        {result[0].title}
        <br />
        {result[0].content}
      </div>
    </main>
  )
}
