'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function DetailLink() {
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
   */
  let router = useRouter()
  // 현재 URL 출력: usePathname()
  // 현재 Search parameter 출력: useSearchParams()
  // 유저가 [dynamic route] 입력한 내용 출력: useParams()
  let currentUrl = usePathname()
  return (
    <button
      onClick={() => {
        router.push('/')
      }}
    >
      버튼
    </button>
  )
}
