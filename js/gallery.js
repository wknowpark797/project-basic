const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.loading');

const api_key = '7f259a4112d06fbef0736c84af20f014';
const method_interest = 'flickr.interestingness.getList';
const num = 30;

// nojsoncallback: 객체가 아닌 함수 형태일 때
const baseURL = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${num}`;

fetch(baseURL)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		console.log(data.photos.photo);

		const items = data.photos.photo;
		let tags = '';

		items.forEach((item) => {
			tags += `
        <li class="item">
          <div>
            <a href="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg">
              <img src="https://live.staticflickr.com/${item.server}/${item.id}_${
				item.secret
			}_m.jpg" />
            </a>
            <p>${item.title === '' ? 'Have a good day ~' : item.title}</p>
          </div>
        </li>
      `;
		});

		wrap.innerHTML = tags;

		/*
      [ isoLayout 처음 적용 시 이미지 카드가 겹치는 원인 ]
      img DOM은 생성 되었지만 해당 DOM에 수반되는 소스 이미지가 아직 렌더링 되지 않은 시점에서 isoLayout구문이 호출되었기 때문
      -> 해결방법: 동적으로 만들어진 모든 img DOM을 반복 하면서 onload 이벤트를 연결하여 모든 소스 이미지가 렌더링 완료가 된 시점에 isoLayout 함수를 호출
    */

		const imgArr = wrap.querySelectorAll('img');
		let count = 0;

		for (const el of imgArr) {
			el.onload = () => {
				count++;
				console.log(count);

				count === imgArr.length && isoLayout();
			};
		}
	});

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}
