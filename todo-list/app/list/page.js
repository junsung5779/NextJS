import { connectDB } from '@/util/database'
import ListItem from './ListItem'

// todo-list 전체 데이터 노출
export default async function List() {
  /**
   * client component 내의 code는 user browser로 전달되기 때문에
   * 해당 페이지를 사용하는 모든 user 들이 DB I/O code를 볼 수 있다.
   * 따라서 DB I/O code는 server component 안에서만 작성해야 함.
   */
  // DB 연결 후 데이터 가져옴(서버 컴포넌트라서 useEffect 등을 사용할 수 없다.)
  const db = (await connectDB).db('todo-DB')
  let result = await db.collection('todo-tbl').find().toArray()

  // mongoDB에서는 _id 값에 ObjectId를 사용하고 있다.
  // (ex) _id: new ObjectId('655b90b894116b1f27059b85'))

  // props로 자식 컴포넌트에 object를 넘겨줄 경우 plain object 형태로 넘겨줘야 한다.(안지키면 warning 뜸)
  // plain object이기 위해선 toJson() method가 객체 내부에 없어야 한다.

  // mongoDB의 ObjectId는 자체적으로 toJSON 메소드를 가지고 있기 때문에
  // mongoDB에서 가져온 _id값을 props로 넘겨줄 경우 _id값을 string으로 전환해서 plain Object형태로 넘겨줘야 한다.
  const resultData = result.map((data) => ({
    /**
     * data객체의 속성들을 펼쳐서 가져온 후 _id 속성을 변환한다.
     * 이렇게 하면 resultData는 data객체의 모든 속성을 그대로 가지면서 _id값만 변경함
     */
    ...data,
    _id: data._id.toString(),
  }))

  return (
    <div className="list-bg">
      <ListItem result={resultData} />
    </div>
  )
}
