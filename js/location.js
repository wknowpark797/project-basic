/*
  [ 구글 지도에서 위도, 경도의 좌표값을 정확하게 구하기 ]

  1. Google Maps에서 원하는 위치값을 찍어 좌표값 복사
  2. 카카오맵의 '클릭한 위치에 마커 표시하기' 샘플의 직접해보기 섹션에 해당 위치값을 붙여넣기
  3. 해당 테스트 화면에서 정밀하게 원하는 지점을 클릭하여 해당 코드값을 활용
*/

const mapContainer = document.querySelector('#map');
const position = new kakao.maps.LatLng(37.51269647949463, 127.06068851054262); // 지도 위치 인스턴스
const mapOption = { center: position, level: 3 }; // 지도 생성 옵션
const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 인스턴스 생성
const marker = new kakao.maps.Marker({ position: position }); // 마커 인스턴스 생성

// 마커 인스턴스에서 setMap 함수로 지도 인스턴스 바인딩
marker.setMap(map);
