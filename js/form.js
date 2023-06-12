/*
  [ 진행 순서 ]
  
  - Form Validation
  1. submit 버튼에 form 전송 이벤트 연결
  2. 각 form 항목마다의 인증함수 정의
  3. 각 함수마다 인증여부에 따라 true, false 값 리턴
  4. 전송 버튼 클릭 시 각 함수에서 하나라도 false 값 리턴 시 전송기능 막음
  
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isText('userid', 5)) e.preventDefault();
	if (!isText('comments', 10)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	// if (!isCheck()) e.preventDefault();
	// if (!isSelect()) e.preventDefault();
});

// 텍스트 항목 인증 (input, textarea)
function isText(name, length) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();

	if (text.length < length) {
		alert(`입력 항목에 ${length}글자 이상 입력하세요.`);
		return false;
	}

	return true;
}

/*
	password 인증
	- 다섯글자 이상 입력, 두개의 비밀번호 일치
*/
function isPwd(pwd1, pwd2, length) {
	const pwdValue1 = form.querySelector(`[name=${pwd1}]`).value;
	const pwdValue2 = form.querySelector(`[name=${pwd2}]`).value;

	if (pwdValue1 !== pwdValue2 || pwdValue1.length < length) {
		alert(`두개의 비밀번호를 동일하게 입력하고 ${length}글자 이상 입력하세요.`);
		return false;
	}

	return true;
}

/*
	email 인증
	- 여섯글자 이상 입력, @ 포함
*/
function isEmail(name, length) {
	const email = form.querySelector(`[name=${name}]`).value;

	if (!email.indexOf('@') || email.length < length) {
		alert(`이메일 주소에 @가 포함되어야 하고 ${length}글자 이상 입력하세요.`);
		return false;
	}

	return true;
}

// check 요소 인증
function isCheck(name) {
	return true;
}

// select 요소 인증
function isSelect(name) {
	return true;
}
