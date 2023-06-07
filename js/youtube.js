/*
  [ Google Cloud API 사용 ]
  - 외부 API 서비스 token 값 발행
  - 외부 API 데이터를 가져오기 위해 url 생성을 위한 API 사용법 숙지
  - 해당 API 요청 url로 fetch 함수를 이용하여 데이터를 받은 뒤, 배열값만 출력
*/

const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
const list = 'PLEJLcTMBRARfXocKJpD9DCEBS1kUxA7jl';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		console.log(data.items);
	});
