'use client'

import Link from 'next/link'

export default function ListItem({ result }) {
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
   * <form>태그 쓰면 서버로 GET, POST 요청이 가능하다
   * fetch() 함수사용해도 서버로 GET, POST, PUT, DELETE 요청이 가능하다 -> ajax라고 부름
   * ajax의 장점: <form>사용 시 요청보내면 항상 새로고침이 되는데
   * ajax는 새로고침없이 요청 전송 가능
   */
  console.log(result)
  return (
    <div>
      {result.map((e, idx) => (
        <div className="list-item" key={idx}>
          {/* 일부 컴포넌트에만 prefetch 기능을 사용하고 싶으면 prefetch={false} */}
          {/* 개발중일 땐 prefetch 여부 확인불가 -> 사이트 발행 시 확인 가능*/}
          <Link prefetch={false} href={`/detail/${result[idx]._id.toString()}`}>
            <h4>{result[idx].title}</h4>
            <p>{result[idx].content}</p>
          </Link>
          <button>
            <Link href={`/edit/${result[idx]._id}`}>수정</Link>
          </button>
          <span
            onClick={() => {
              fetch('/api/post/delete', {
                method: 'DELETE',
                // 서버로 array나 object 형태로 보낼 땐 JSON.stringify({보낼 Object})를 사용하자
                // ex) body: JSON.stringify({_id: result[idx]._id}
                // {id: 1234} -> {"id": 1234} 로 변경해줌
                body: JSON.stringify({
                  _id: result[idx]._id,
                }),
              })
                .then((r) => {
                  if (r.status == 200) {
                    return r.json()
                  } else {
                    //서버가 에러코드전송시 실행할코드
                  }
                })
                .then((r) => {
                  console.log(r)
                  window.location.reload()
                })
                .catch((error) => {
                  //인터넷문제 등으로 실패시 실행할코드
                  console.log(error)
                })
            }}
          >
            삭제
          </span>
        </div>
      ))}
    </div>
  )
}
