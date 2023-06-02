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
const btnShow = document.querySelector('header h1');
const btnDelete = document.querySelectorAll('header #gnb li')[0];

const pop = document.querySelector('#pop');
const checkInput = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');