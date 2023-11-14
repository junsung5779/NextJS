/**
 * import / export 문법
 * A파일에서 선언된 변수나 함수 하나를 다른 파일에서 사용하고 싶으면
 * A파일에서 먼저 export default 변수 또는 함수명 사용하면 됨.
 * 먼저 내보내야 다른곳에서 불러들일 수 있기 때문.
 * export default로 모듈(해당 파일)을 내보낸다면
 * export한 이름과 상관없이 원하는 이름으로 import가 가능하다.
 * 또한 import시에 중괄호 작성이 필요없다.
 * 
 * A파일에서 선언된 변수 및 함수 여러개를 다른 파일에서 사용하고 싶으면
 * export {변수, 함수a, 함수b, ...};
 * 
 * export default 또는 export는 파일마다 1회만 사용 가능
 * 
 */
let age = 20;
let name = 'kim';
export {age, name};