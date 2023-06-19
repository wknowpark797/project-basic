/*
  [ Swiper 적용 순서 ]
  1. HTML의 head에 Swiper 전용 css, js CDN 코드 연결
  2. HTML 구조를 frame > .swiper-wrapper > .swiper-slide 클래스 명으로 생성
  3. css에서 전체 frame의 넓이와 높이값만 지정 (자식요소 크기 지정 필요 X)
  4. 스크립트 파일에서 new Swiper('frame명');
*/

new Swiper('#visual');
