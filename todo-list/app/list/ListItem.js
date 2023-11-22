/**
 * client component
 */

'use client'

/**
 * client component에서 DB 가져오는 방법
 * 1. useEffect() 사용
 * 단점: 검색노출 어려울 수 있음
 * 이유: useEffect()의 실행 시점은 return 내의 HTML부터 유저에게 보여준 이후임.
 * 유저 입장에서는 문제가 되지 않지만 검색엔진 bot들도 해당 페이지를 방문한다는 것임.
 * 검색엔진 bot이 useEffect()로 작성된 페이지 방문 시 텅 빈 HTML이 먼저 보이기 때문에 다른페이지로 넘어가게 되면서
 * 구글이 해당 페이지에 대한 데이터를 수집하는데 문제가 될 수 있다.
 *
 * 2. server component에서 DB 데이터 가져온 후 하위 컴포넌트로 props
 * 장점: 페이지를 유저에게 보여줄 때 완성된 HTML을 보여줄 수 있음
 * -> 검색엔진 노출이 중요한 사이트 제작 시 추천
 */

/**
   * useRouter() 는
   * 1. client component 안에서만 사용 가능하다.
   * 1-1. server component 안에서 사용하고 싶다면 useRouter()기능이 있는 client component를 하나 만들고 server component 내에서 컴포넌트 형태로 사용.
   * 2. next/naviagtion에서 import 해와야 한다.
   *
   * 사용법: router.push('이동할 경로')
   * 같은 기능을 하는 Link 태그가 있음에도 불구하고 useRouter()를 쓰는 이유
   * 1. 페이지 이동과 관련된 추가적인 기능 존재
   * router.back()      : 뒤로가기
   * router.forward()   : 앞으로가기
   * router.refresh()   : soft refresh(브라우저 전체 가 아니라 변동사항이 있는 html 일부분만 바꿔줌)
   * router.prefetch()  : page 미리 load(해당 페이지 load 필요한 모든 파일들을 미리 load함) -> 해당 페이지 방문 시 빠른 속도로 로드 가능
   *
   * Link 태그에도 prefetch() 기능이 기본으로 내장되어 있음.
   * 사용자가 큰 용량의 페이지를 접속할 것으로 예상되는데도 불구하고 현재 페이지와 관련이 없는 링크를 포함하는 경우, 
   * 불필요한 리소스를 사전 로드하지 않아 초기 페이지 로딩 속도를 개선할 수 있음.
   * 또는 특정 링크를 사용자가 클릭하기 전까지는 미리 로드할 필요가 없는 경우에도 prefetch를 비활성화할 수 있음.
   */

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
