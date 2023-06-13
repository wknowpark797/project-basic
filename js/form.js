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
	// if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
});

// 텍스트 항목 인증 (input, textarea)
function isText(name, length) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();

	if (text.length < length) {
		resetError(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `입력 항목에 ${length}글자 이상 입력하세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetError(input);
		return true;
	}
}

/*
	password 인증
	- 다섯글자 이상 입력, 두개의 비밀번호 일치
*/
function isPwd(pwd1, pwd2, length) {
	const pwdEl1 = form.querySelector(`[name=${pwd1}]`);

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[!@#$%^&*()_+]/;

	const pwdValue1 = form.querySelector(`[name=${pwd1}]`).value;
	const pwdValue2 = form.querySelector(`[name=${pwd2}]`).value;

	// num.test(pwdValue1): pwdValue1에서 정규표현식으로 분류한 값이 포함되어 있으면 true를 반환

	if (
		pwdValue1 !== pwdValue2 ||
		pwdValue1.length < length ||
		!num.test(pwdValue1) ||
		!eng.test(pwdValue1) ||
		!spc.test(pwdValue1)
	) {
		resetError(pwdEl1);
		const errMsg = document.createElement('p');
		errMsg.innerText = `비밀번호는 ${length}글자 이상, 특수문자, 영문, 숫자를 모두 포함하세요.`;
		pwdEl1.closest('td').append(errMsg);
		return false;
	} else {
		resetError(pwdEl1);
		return true;
	}
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
	const inputs = document.querySelectorAll(`[name=${name}]`);

	let isChecked = false;

	// 현재 반복되는 체크 요소에 하나라도 체크가 되어있다면 지역변수 isChecked = true 로 변경
	for (const input of inputs) input.checked && (isChecked = true);

	if (!isChecked) {
		resetError(inputs);
		const errMsg = document.createElement('p');
		errMsg.innerText = `'해당 선택사항을 하나 이상 선택하세요.'`;
		inputs[0].closest('td').append(errMsg);
		return false;
	} else {
		resetError(inputs);
		return true;
	}
}

// select 요소 인증
console.log(document.querySelector('select[name=edu]'));

function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selectedIndex = input.options.selectedIndex;
	const value = input.options[selectedIndex].value;

	if (value === '') {
		resetError(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 요소 중 하나를 선택해주세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetError(input);
		return true;
	}
}

// 에러 메세지 제거 함수
function resetError(inputs) {
	let element = null;
	inputs.length ? (element = inputs[0]) : (element = inputs);
	const errMsg = element.closest('td').querySelector('p');
	if (errMsg) element.closest('td').querySelector('p').remove();
}
