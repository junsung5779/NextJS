export default async function Write() {
  // 서버로 GET,POST method 요청하려면 <form>태그 사용
  return (
    <div className="p-20">
      <h4>글 작성 페이지</h4>
      <form action="/api/post/new" method="POST">
        <div>
          <p>요일선택</p>
          <select name="day_of_week" className="select">
            <option value="월">월</option>
            <option value="화">화</option>
            <option value="수">수</option>
            <option value="목">목</option>
            <option value="금">금</option>
            <option value="토">토</option>
            <option value="일">일</option>
          </select>
        </div>
        <br />
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
