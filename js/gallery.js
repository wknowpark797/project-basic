const wrap = document.querySelector('.gallery .wrap');
const api_key = '7f259a4112d06fbef0736c84af20f014';
const method_interest = 'flickr.interestingness.getList';
const num = 5;

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
        <article>
          <div class="pic">
            <img src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg" />
          </div>
        </article>
      `;
		});

		wrap.innerHTML = tags;
	});
