/*
  [ 쿠키 팝업 ]
  - 쿠키 (cookie)
    쿠키는 사용자의 컴퓨터에 물리적인 파일 형태로 저장하는 경량의 텍스트 자료
    name=value 형식으로 저장
    쿠키 생성 시 쿠키의 생성주기를 설정할 수 있다.
    
    name=value; path=/; expires=쿠키만료일;

    document.cookie: 생성된 쿠키값 확인 가능
*/

/*
  문자열.indexOf(찾을 문자열)
  - 전체 문자열에서 인수로 전달한 문자열의 시작 순번을 반환
  - 전체 문자열에서 indexOf 특정 문자열을 찾지 못하면 -1을 반환
  
  indexOf 사용 이유: -1을 통해 전체 문자열에서 특정 문자값의 유무를 판단하기 위함
*/

// 임시 트리거 설정 (로고, 첫번째 메뉴)
const btnShow = document.querySelectorAll('header .sns li')[0];
const btnDelete = document.querySelectorAll('header .sns li')[1];

const pop = document.querySelector('#pop');
const checkInput = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');

// 브라우저 로딩 시 쿠키 유무에 따라 팝업 노출
const cookieData = document.cookie;
if (cookieData.indexOf('today=done') < 0) {
	// 쿠키가 없을 때 실행
	pop.style.display = 'block';
} else {
	// 쿠키가 있을 때 실행
	pop.style.display = 'none';
}

// 쿠키 확인
btnShow.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(document.cookie);
});

// 쿠키 삭제
btnDelete.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
	alert('쿠키삭제 완료');
});

// 팝업 닫기
btnClose.addEventListener('click', (e) => {
	e.preventDefault();

	// 체크박스 선택 - 쿠키 생성
	if (checkInput.checked) {
		setCookie('today', 'done', 1);
	}
	pop.style.display = 'none';
});

function setCookie(name, value, expires) {
	let today = new Date();
	let duedate = today.getDate() + expires; // 오늘 날짜값 + 1 (만료기간 설정)
	today.setDate(duedate);
	const result = today.toGMTString(); // 문자로 변환

	document.cookie = `${name}=${value}; path=/; expires=${result}`;
}
