import { connectDB } from '@/util/database'
import ListItem from './ListItem'

export default async function List() {
  const db = (await connectDB).db('todo-DB')
  let result = await db.collection('todo-tbl').find().toArray()

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  )
}
