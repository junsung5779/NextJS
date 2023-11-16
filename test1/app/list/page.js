'use client'

import { useState } from "react";

export default function List() {
	// map()의 기능(반복 생성이 핵심)
	// map()의 첫 번째 매개변수: array 안의 자료를 순서대로 출력해줌
	// map()의 두 번째 매개변수: array 의안의 index를 0번째 부터 순서대로 출력해줌
	// return에 적은걸 array로 담아줌
	let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
	let [수량, 수량변경] = useState(0)
	// state 장점
	// 1. state가 변경되면 state를 쓰는 html 부분도 자동 재렌더링 됨
	

    return (
		<div>
			<h4 className="title">상품목록</h4>
			{ 상품.map((a, idx)=>{
					return (
						<div className="food" key={idx}>
							<img src={`/food${idx}.png`} className="food-img"/>
							<h4>{a} $40</h4>
							<span> {수량} </span>
							<button onClick={()=>{ 수량변경(수량+1) }}>+</button>
							<button onClick={()=>{ 수량변경(수량-1) }}>-</button>
						</div>
					)
				})
			}
		</div>
    );
}