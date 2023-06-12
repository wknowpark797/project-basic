const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn-search');
const btnInterest = document.querySelector('.gallery .btn-interest');
const btnMy = document.querySelector('.gallery .btn-my');

const api_key = '7f259a4112d06fbef0736c84af20f014';
const num = 50;
const myId = '198471371@N05';

/*
	[ Key Event ]
	keydown: 키를 누를 때
	keyup: 키를 뗄 때
		- Mac OS에서 이벤트가 두번씩 발생
	keypress: 키를 누른 후 뗄 때 (추천)
		- 한자와 같은 특수 키 지원X
*/

fetchData(setURL('interest'));

btnSearch.addEventListener('click', getSearch);

// 검색창 키보드 이벤트
input.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());

// 사용자 아이디 클릭 시 해당 갤러리 확인 이벤트
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'userid') fetchData(setURL('user', e.target.innerText));
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

btnInterest.addEventListener('click', () => fetchData(setURL('interest')));
btnMy.addEventListener('click', () => fetchData(setURL('user', myId)));

function setURL(type, opt) {
	// nojsoncallback: 객체가 아닌 함수 형태일 때
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

function getSearch() {
	const value = input.value.trim(); // 양 옆의 공백 제거
	input.value = '';

	if (value === '') return alert('검색어를 입력해주세요.');
	fetchData(setURL('search', value));
}

async function fetchData(url) {
	loading.classList.remove('off');
	wrap.classList.remove('on');

	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	console.log(items);

	if (items.length === 0) {
		loading.classList.add('off');
		wrap.classList.add('on');
		return alert('해당 검색어의 결과가 없습니다.');
	}

	createList(items);
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
        <li class="item">
          <div>
						<img class="thumb" 
							src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg" 
							alt="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg" />

            <p>${item.title === '' ? 'Have a good day ~' : item.title}</p>

						<article class="profile">
							<img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg" />
							<span class="userid">${item.owner}</span>
						</article>
          </div>
        </li>
      `;
	});

	wrap.innerHTML = tags;

	setLoading();
}

function setLoading() {
	/*
      [ isoLayout 처음 적용 시 이미지 카드가 겹치는 원인 ]
      - img DOM은 생성 되었지만 해당 DOM의 소스 이미지가 아직 렌더링 되지 않은 시점에서 isoLayout구문이 호출되었기 때문
				- 이미지의 높이값이 제대로 적용되지 않아 겹침 발생
				- 해결방법: 동적으로 만들어진 모든 img DOM을 반복 하면서 
					onload 이벤트를 연결하여 모든 소스 이미지가 렌더링 완료가 된 시점에 isoLayout 함수를 호출
    */

	const imgArr = wrap.querySelectorAll('img');
	let count = 0;

	for (const el of imgArr) {
		// 이미지의 엑박 오류 발생 시 onerror 이벤트로 잡아 디폴트 이미지로 대체
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};

		// 디폴트 이미지까지 포함하여 카운트 (무한로딩 오류 처리)
		el.onload = () => {
			count++; // 이미지 태그의 소스가 렌더링 완료될 때마다 증가
			// console.log(count);

			count === imgArr.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}

function createPop(url) {
	document.body.style.overflow = 'hidden';
	const aside = document.createElement('aside');
	aside.className = 'pop';

	const tags = `
		<div class="con">
			<img src="${url}" />
		</div>
		<span class="close">close</span>
	`;

	aside.innerHTML = tags;
	document.body.append(aside);

	setTimeout(() => {
		document.querySelector('.pop').classList.add('on');
	}, 0);
}

function removePop() {
	document.body.style.overflow = 'auto';
	const pop = document.querySelector('.pop');
	pop.classList.remove('on');

	setTimeout(() => {
		pop.remove();
	}, 1000);
}
