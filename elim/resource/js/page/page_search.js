var searchText = '';


function kakaoItemMap(address='강남대로 94길 34', itemName='상품명')
{
	//카카오맵
	let containerH = $(".topmap-view").height();

	$("#searchMap").height(containerH + 'px');
	var container = document.getElementById('searchMap'); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};

	var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
	var geocoder = new kakao.maps.services.Geocoder();
	var content = `<div class="kakao-map-marker text-xs p-2">${itemName}</div>`;
	geocoder.addressSearch(address, function(result, status) {

		// 정상적으로 검색이 완료됐으면 
		if (status === kakao.maps.services.Status.OK) {

				var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

				// 결과값으로 받은 위치를 마커로 표시합니다
				var marker = new kakao.maps.Marker({
						map: map,
						position: coords
				});

				marker.setMap(map);

				// 커스텀 오버레이가 표시될 위치입니다 
				var position = new kakao.maps.LatLng(result[0].y, result[0].x);

				console.log(position)

				// 커스텀 오버레이를 생성합니다
				var customOverlay = new kakao.maps.CustomOverlay({
						position: position,
						content: content,
						xAnchor: 0.3,
						yAnchor: 0.91
				});

				customOverlay.setMap(map);

				// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
				map.setCenter(coords);
		}
	});

	setTimeout(function(){$(`.kakao-map-marker`).addClass("moved");},100);
}
//검색결과
function makeSearchResult()
{
	console.log('반복');
	for(let i=0; i<30; i++)
	{
		let str = 
		`
		<div class="table_row">
			<div class="table_td">${i+1}</div>
			<div class="table_td">홍우빌딩${i+1}</div>
			<div class="table_td">50,000</div>
		</div>
		`;
		$("#TABLE_RANK_TBODY").append(str);
	}
	
}