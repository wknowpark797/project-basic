const wrap = document.querySelector('.department .wrap');

/*
  [ Fetch ]
  ES6에서 새로나온 내장함수
  데이터를 가져오는 기본 기능 + Promise 객체로 리턴

  [ 외부 데이터 가져오는 공식 ]
  fetch('데이터 URL')
    .then((data) => data.json())
    .then((json) => {
      // 데이터를 성공적으로 받았을 때 실행할 구문
      console.log(json);
    })
    .catch((err) => {
      // 데이터 응답에 실패했을 때 실행할 구문
      console.log(err);
    })

  [ json() ]
  첫번째 res가 문자열 형태이므로 json 형태로 바꿔준다.
  자동으로 Promise 객체로 감싸 반환해준다.
*/

let tags = '';

fetch('/DB/department.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		const membersArr = data.members;

		membersArr.map((member) => {
			tags += `
        <article>
          <div class="pic">
            <img src="img/${member.pic}" />
          </div>
          <h2>${member.name}</h2>
          <p>${member.position}</p>
        </article>
      `;
		});

		console.log(tags);
		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});

/*
  [ async await 코드 ]

  fetchDepartment();
  async function fetchDepartment() {
    const result = await fetch('/DB/department.json');
    const data = await result.json();
    console.log(data);
  }
*/
