
export default function List() {
  let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
	let 가격 = [20,30,40]
	let b = 상품.map((a, idx)=>{
		// map()의 기능(반복 생성이 핵심)
		// map()의 첫 번째 매개변수: array 안의 자료를 순서대로 출력해줌
		// map()의 두 번째 매개변수: array 의안의 index를 0번째 부터 순서대로 출력해줌
		// return에 적은걸 array로 담아줌
		return 상품[idx]
	})

    return (
			<div>
				<h4 className="title">상품목록</h4>
				{
					상품.map((e, idx)=>{
						return (
							<div className="food" key={idx}>
								<h4>{b[idx]} {가격[idx]}</h4>
								<img src={`/food${idx}.png`} className="food-img"/>
							</div>
						)
					})
				}
			</div>
    );
}