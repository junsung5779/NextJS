/**
 * client component
 */

'use client'

import Link from 'next/link'
import { useState } from 'react'

const weekdays = ['월', '화', '수', '목', '금', '토', '일']

export default function ListItem({ result }) {
  const [selectedDay, setSelectedDay] = useState(null)
  // 버튼 클릭 시
  const handleButtonClick = (value) => {
    setSelectedDay(value)
  }

  const handleDelete = (dataId) => {
    fetch('/api/post/delete', {
      method: 'DELETE',
      // 서버로 array나 object 형태로 보낼 땐 JSON.stringify({보낼 Object})를 사용하자
      // ex) body: JSON.stringify({_id: result[idx]._id}
      // {id: 1234} -> {"id": 1234} 로 변경해줌
      body: JSON.stringify({ _id: dataId }),
    })
      // 상태값이 200이면 응답값을 json으로 반환 하고 아니면 null 반환
      .then((response) => {
        if (response.status === 200) {
          console.log('응답값 200 받음')
          return response.json()
        } else {
          //서버가 에러코드전송시 실행할코드
          console.log('응답값 200 못받음')
          throw new Error('서버 에러') // 예외를 던져서 .catch() 블록으로 이동
        }
      })
      .then((responseData) => {
        // 상태값200을 받은 경우 실행할 코드
        window.location.reload()
      })
      .catch((error) => {
        //인터넷 문제 등으로 실패시 실행할코드
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
        // props로 받은 result 배열을 filter 내에서 result로 받아서 사용
        .filter((result) => (selectedDay ? result.day_of_week === selectedDay : true))
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
              <span onClick={() => handleDelete(e._id)}>삭제</span>
            </button>
          </div>
        ))}
    </div>
  )
}
