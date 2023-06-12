/*
  [ 진행 순서 ]
  
  - form validation
  1. submit 버튼에 form 전송 이벤트 연결
  2. 각 form 항목마다의 인증함수 정의
  3. 각 함수마다 인증여부에 따라 true, false 값 리턴
  4. 전송 버튼 클릭 시 각 함수에서 하나라도 false 값 리턴 시 기본기능 막음
  
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isUser()) e.preventDefault();
	if (!isPwd()) e.preventDefault();
	if (!isEmail()) e.preventDefault();
	if (!isCheck()) e.preventDefault();
	if (!isSelect()) e.preventDefault();
});

// userid 인증
function isUser() {
	return true;
}

// password 인증
function isPwd() {
	return true;
}

// email 인증
function isEmail() {
	return true;
}

function isCheck() {
	return true;
}

function isSelect() {
	return true;
}
