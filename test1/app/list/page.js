'use client'

import { useState } from "react";

export default function List() {
	// map()의 기능(반복 생성이 핵심)
	// map()의 첫 번째 매개변수: array 안의 자료를 순서대로 출력해줌
	// map()의 두 번째 매개변수: array 의안의 index를 0번째 부터 순서대로 출력해줌
	// return에 적은걸 array로 담아줌
	let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
	let 상품별수량 = [0,0,0]
	let [수량, 수량변경] = useState(상품별수량)
	// state 장점
	// 1. state가 변경되면 state를 쓰는 html 부분도 자동 재렌더링 됨
	// ----
	/** 
	 * array/object인 state의 경우
	 * ...로 복사해서 수정 과정을 거친 후 state변경함수 사용하자
	 * 이유:
	 * 
	 * 1. 자바스크립트는 array/object 자료를 하나 만들면
	 * 예를 들어서 let arr = [1,2,3] 이렇게 만들면 
	 * [1,2,3] 자료는 RAM이라는 공간에 몰래 저장이 되고
	 * let arr 변수엔 그 자료가 어디있는지 가리키는 화살표만 담겨있습니다.

	 * 2. array/object 자료를 수정한다고 해도 
	 * 화살표타고 들어가서 RAM에 있던 값이 수정될 뿐
	 * 변수에 담긴 화살표는 변하지 않습니다. 
	 * 그래서 아까 기존state == 신규state 비교하면 같다고 나오는 것임
	 * (==로 비교하면 변수에 저장된 값인 화살표만 비교해줍니다)
	 * 3. 심지어 array/object 자료를 복사해도 화살표만 복사됩니다. 
	 * 
	 */ 

    return (
		<div>
			<h4 className="title">상품목록</h4>
			{ 상품.map((a, idx)=>{
					return (
						<div className="food" key={idx}>
							<img src={`/food${idx}.png`} className="food-img"/>
							<h4>{a} $40</h4>
							<span> {수량[idx]} </span>
							<button onClick={()=>{ 
								let copy = [...수량]	// 독립적인 array 만들어서 복사해줌
								copy[idx]++
								수량변경(copy) 
							}}>
								+
							</button>
							<button onClick={()=>{ 
								let copy = [...수량]
								copy[idx]--
								수량변경(copy) 
							}}>
								-
							</button>
						</div>
					)
				})
			}
		</div>
    );
}