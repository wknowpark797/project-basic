/*
  [ Google Cloud API 사용 ]
  - 외부 API 서비스 token 값 발행
  - 외부 API 데이터를 가져오기 위해 url 생성을 위한 API 사용법 숙지
  - 해당 API 요청 url로 fetch 함수를 이용하여 데이터를 받은 뒤, 배열값만 출력
*/

/*
  [ 자주 사용하는 문자열 관련 메서드 ]
  - 문자열.substr(시작 문자열 순서, 자를 문자열 갯수)
    - 특정 문자열에서 원하는 위치에서 원하는 글자갯수까지 잘라서 반환
  - 문자열.split('구분자')
    - 구분자를 기점으로 문자열을 나누어 배열로 반환
  - 배열.join('구분자')
    - 배열값을 구분자로 이어붙여 하나의 문자열로 반환
*/

/*
  [ 이벤트 위임 ]
  - Event Delegate
  - 현재 없는 요소에 이벤트를 전달하기 위해 항상 있는 상위 부모요소에 이벤트를 위임
    (이벤트 버블링을 활용한 개념)
    -> 실무에서 body 태그에 이벤트를 위임하는 경우가 많다.
*/

/*
  [ e.target vs e.currentTarget ]
  - e.target
    - 현재 이벤트 구문상에 선택자로 연결되어 있는 요소를 지칭
    - ex. 이미지 태그
  - e.currentTarget
    - 화면상에서 이벤트가 발생한 대상을 지칭
    - ex. wrap 클래스 태그
*/

/*
  [ 함수 분리 전 fetch 코드 ]

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let tags = '';
      data.items.forEach((item) => {
        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt;

        tags += `
          <article>
            <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>

            <div class="txt">
              <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
              <span>${date.split('T')[0].split('-').join('.')}</span>
            </div>
            
            <div class="pic">
              <img src="${item.snippet.thumbnails.standard.url}" alt=${
          item.snippet.resourceId.videoId
        } />
            </div>
          </article>
        `;
      });

      wrap.innerHTML = tags;

      // then 구문 안쪽에서 동기적으로 DOM 요소가 동적으로 생성된 이후에만 해당 요소에 접근 가능
      // 이벤트 위임으로 then 구문 밖에서 사용할 수 있다.
      const pic = wrap.querySelectorAll('pic')[0];
      pic.addEventListener('click', () => {
        console.log('clicked');
      });
    });
*/

const wrap = document.querySelector('.youtube .wrap');

fetchData();

// 이벤트 위임
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPop();
	if (e.target.className === 'close') removePop();
});

// 데이터 fetching 함수
async function fetchData() {
	const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
	const list = 'PLEJLcTMBRARfXocKJpD9DCEBS1kUxA7jl';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	// Promise 반환 함수에 await 키워드
	const res = await fetch(url);
	const data = await res.json();
	console.log(data.items);

	createList(data.items);
}

// 동적으로 목록을 생성하는 함수
function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;

		tags += `
      <article>
        <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>

        <div class="txt">
          <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
          <span>${date.split('T')[0].split('-').join('.')}</span>
        </div>
        
        <div class="pic">
          <img class="thumb" src="${item.snippet.thumbnails.standard.url}" alt=${
			item.snippet.resourceId.videoId
		} />
        </div>
      </article>
    `;
	});

	wrap.innerHTML = tags;
}

/*
  // 가상 DOM이 만들어지는 것은 비동기 상태이므로 요소를 찾을 수 없다.
  const pic = wrap.querySelectorAll('pic')[0];
  pic.addEventListener('click', () => {
    console.log('clicked');
  });
*/

// 동적으로 팝업 생성 함수
function createPop() {
	const tags = `
    <div class="con"></div>
    <span class="close">close</span>
  `;

	const pop = document.createElement('aside');
	pop.className = 'pop';
	pop.innerHTML = tags;

	document.body.append(pop);

	// 동기화 시켜야 하는 코드에 Promise 객체를 만드는 대신 setTimeout 사용 가능
	// 특정 코드를 강제로 동기화 시키고 싶을 때 setTimeout에 delay를 0으로 지정하여 코드를 패키징 (강제로 WEB API에 전달되었다가 다시 callstack의 마지막에 등록)
	// 팝업이 생성된 후 on 클래스가 생기도록 하기 위함
	setTimeout(() => {
		document.querySelector('.pop').classList.add('on');
	}, 0);

	document.body.style.overflow = 'hidden';
}

// 팝업 제거 함수
function removePop() {
	document.querySelector('.pop').classList.remove('on');

	// on 클래스를 제거한 후 팝업이 사라지도록 하기 위함
	setTimeout(() => {
		document.querySelector('.pop').remove();
	}, 1000);

	document.body.style.overflow = 'auto';
}
