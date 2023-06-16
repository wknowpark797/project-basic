/*
  [ 구글 지도에서 위도, 경도의 좌표값을 정확하게 구하기 ]

  1. Google Maps에서 원하는 위치값을 찍어 좌표값 복사
  2. 카카오맵의 '클릭한 위치에 마커 표시하기' 샘플의 직접해보기 섹션에 해당 위치값을 붙여넣기
  3. 해당 테스트 화면에서 정밀하게 원하는 지점을 클릭하여 해당 코드값을 활용
*/

const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.branch li');

const markerInfo = [
	{
		title: '코엑스',
		position: new kakao.maps.LatLng(37.51269647949463, 127.06068851054262), // 지도 위치 인스턴스
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgOption: { offset: new kakao.maps.Point(116, 99) },
		button: btns[0],
	},
	{
		title: '광화문',
		position: new kakao.maps.LatLng(37.57544863980594, 126.97684985950524),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgOption: { offset: new kakao.maps.Point(116, 99) },
		button: btns[1],
	},
	{
		title: '카카오 본사',
		position: new kakao.maps.LatLng(33.450701, 126.570667),
		imgSrc: 'img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgOption: { offset: new kakao.maps.Point(116, 99) },
		button: btns[2],
	},
];

// 기본 지도 생성
const mapOption = { center: markerInfo[0].position, level: 3 }; // 지도 생성 옵션
const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 인스턴스 생성

// Marker 이미지 등록
markerInfo.forEach((info) => {
	const markerImage = new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgOption);
	const marker = new kakao.maps.Marker({ position: info.position, image: markerImage });

	// Marker 인스턴스의 setMap 함수로 지도 인스턴스 바인딩
	marker.setMap(map);

	info.button.addEventListener('click', () => map.panTo(info.position));
});
