// client compenent 사용법: js파일 최상단에 'use client' 기입
// 'use client'
/**
 * server component, client component 차이
 * server component: html에 자바스크립트 기능넣기 불가능
 * ex) onClick={}, useState, useEffect 등등.. 사용 불가능
 * client component: html에 자바스크립트 기능넣기 가능
 * ex) onClick={}, useState, useEffect 등등.. 사용 가능
 */

/**
 * server component 장점
 * 로딩속도 빠름(페이지 load 시 JS가 별로 필요가 없어서 빠름)
 * 검색엔진 노출에도 유리
 * 
 * server component 단점
 * html에 자바스크립트 기능넣기 불가능
 * 
 * client component 장점
 * 로딩속도 느림(쓸데없는 JS때문에 페이지 용량도 커지고 페이지 로딩속도도 느려짐)
 * 페이지 load 시 hydration 과정을 거치게 되는데
 * html을 로드하고나서 거기에 리액트 문법을 적용하기 위해
 * 컴퓨터가 html을 읽고 분석하는 과정이 필요한데 그걸 hydration이라고 부름
 * 이 과정때문에 페이지 로드 속도가 더 느려짐
 * 
 * client component 단점
 * html에 자바스크립트 기능넣기 가능
 * 
 * 결론:
 * 큰 페이지는 server component
 * JS기능 필요한 곳만 client component
 */

/**
 * 폴더 경로 작성
 * 상위폴더: ./../data.js
 * 하위폴더: ./폴더명/data.js
 * 
 * 변수 또는 함수를 여러 개 import 할 경우
 * 중괄호 내에서 해당 변수 또는 함수명을 임의로 작명하지 말고 그대로 들고와야 함.
 */

import {age, name} from './data.js'
import Homework from './homework.js'

export default function Cart() {
	let 장바구니 = ['Tomatoes', 'Pasta']
	return(
		<div>
			<h4 className="title">Cart</h4>
			<div>
				{Homework}
			</div>
			<CartItem item={장바구니[0]}/>
			<CartItem item={장바구니[1]}/>
			<RedButton color='red'/>
			<RedButton color='blue'/>
		</div>
	)
}

function CartItem(props){
	return (
		<div className="cart-item">
			<p>{props.item}</p>
			<p>$40</p>
			<p>1개</p>
		</div>
	)
}

function RedButton(props) {
	return <button style={{ background: props.color }}>빨간색 버튼!</button>
}