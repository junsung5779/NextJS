'use client'

import Link from 'next/link'
import { useState } from 'react'

const weekdays = ['월', '화', '수', '목', '금', '토', '일']

export default function ListItem({ result }) {
  const [selectedDay, setSelectedDay] = useState(null)

  const handleButtonClick = (value) => {
    setSelectedDay(value)
  }

  const handleDelete = (itemId) => {
    fetch('/api/post/delete', {
      method: 'DELETE',
      body: JSON.stringify({ _id: itemId }),
    })
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((r) => {
        console.log(r)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
      <div>
        {weekdays.map((day) => (
          <button key={day} onClick={() => handleButtonClick(day)}>
            {day}
          </button>
        ))}
        <button onClick={() => handleButtonClick(null)}>전체</button>
      </div>
      {result
        .filter((todolist) => (selectedDay ? todolist.day_of_week === selectedDay : true))
        .map((e, idx) => (
          <div className="list-item" key={idx}>
            <Link prefetch={false} href={`/detail/${e._id.toString()}`}>
              <h4>요일: {e.day_of_week}</h4>
              <h4>제목: {e.title}</h4>
              <h4>내용: {e.content}</h4>
            </Link>
            <button>
              <Link href={`/edit/${e._id}`}>수정</Link>
            </button>
            <button className="deleteButton">
              <span onClick={() => handleDelete(item._id)}>삭제</span>
            </button>
          </div>
        ))}
    </div>
  )
}
