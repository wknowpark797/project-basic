const mapContainer = document.querySelector('#map');
const mapOption = {
	center: new kakao.maps.LatLng(33.450701, 126.570667),
	level: 3,
};
const map = new kakao.maps.Map(mapContainer, mapOption);

const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
const marker = new kakao.maps.Marker({
	position: markerPosition,
});

marker.setMap(map);
