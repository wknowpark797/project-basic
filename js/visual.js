/*
  [ Swiper 적용 순서 ]

  1. HTML의 head에 Swiper 전용 css, js CDN 코드 연결
  2. HTML 구조를 frame > .swiper-wrapper > .swiper-slide 클래스 명으로 생성
  3. css에서 전체 frame의 넓이와 높이값만 지정 (자식요소 크기 지정 X)
  4. 스크립트 파일에서 new Swiper('frame명');
*/

const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');
const btnPagination = document.querySelector('.swiper-pagination');
const btnPrev = document.querySelector('.swiper-button-prev');
const btnNext = document.querySelector('.swiper-button-next');
const frame = document.querySelector('#visual');

const swiper = new Swiper('#visual', {
	loop: true,
	// effect: 'fade',
	centeredSlides: true,
	autoplay: {
		delay: 1000,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	slidesPerView: 3,
	spaceBetween: 30,
	breakpoints: {
		// 0px 이상일 때 (mobile)
		0: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		// 640px 이상일 때 (tablet)
		640: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// 1000px 이상일 때 (desktop)
		1000: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});

btnPlay.addEventListener('click', () => {
	swiper.autoplay.start();
	btnPlay.classList.add('on');
	btnPause.classList.remove('on');
});
btnPause.addEventListener('click', () => {
	swiper.autoplay.stop();
	activateBtnPause();
});

[btnPagination, btnPrev, btnNext].forEach((el) => {
	el.addEventListener('click', activateBtnPause);
});

swiper.on('sliderMove', activateBtnPause);

function activateBtnPause() {
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
}
