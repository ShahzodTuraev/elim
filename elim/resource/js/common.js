//*공통 스크립트 및 index페이지의 요소는 여기서 작업한다
const PARENT 				= $("body"); //전역 최상단 문서위치
const INCLUDE_PATH 	= "/elim/include/";
const POPUP_PATH    = "/elim/include/popup/";
const PAGE_PATH 		= "/elim/include/page/";


$(document).ready(function(){

	//스크롤 설정
	$("html, body").easeScroll({
		frameRate: 60,
		animationTime: 1500,
		stepSize: 100,
		pulseAlgorithm: !0,
		pulseScale: 8,
		pulseNormalize: 1,
		accelerationDelta: 20,
		accelerationMax: 1,
		keyboardSupport: !0,
		arrowScroll: 50
	});

	$("body, html").height(window.innerHeight+'px');
	// $("#POPUP_VIEW").height(window.innerHeight+'px');
	//앵커 스크롤
	$('a').click(function () {
		// $('html, body').animate({ scrollTop: $($.attr(this, 'href')).offset().top-220 }, 700);
		// return false;
	});


	//-- 닫기버튼 클릭 : 팝업닫기
	$(document).on("click",".btn_close",function(){ popupControl('hide');});

	//-- redLine 온오프 F4
	$(window).on('keyup', function(e){ if(e.keyCode == 115) redLine == false ? devLine("on") : devLine("off"); });
	
	//-- ENTER EVENT 모음
	$(document).on('keyup', "#INPUT_PW", (e)=>{ if(e.keyCode == 13) $("#BTN_LOGIN").click(); });
	$(document).on('keyup', "#INPUT_GPT_CHAT", (e)=>{ if(e.keyCode == 13) $("#BTN_GPT_SUBMIT").click(); });
	$(document).on('keyup', "#INPUT_ITEM_ADDRESS", (e)=>{ if(e.keyCode == 13) $("#BTN_SEARCH_ADD").click(); });
	$(document).on('keyup', "#SEARCH_ITEM_NAME", (e)=>{ if(e.keyCode == 13) $("#BTN_SEARCH_ITEM").click(); });

	//-- 팝업바깥 클릭시 닫기
	$(document).on("click","div.popup_container",function(e){
		if(e.target.className == "popup_container"){popupControl("HIDE"); }
	});
});
//== READY END

//-- 개발용 redLine뷰
let redLine = false;
function devLine(v){
	if(v == "on")
	{
		$("*").css({outline:"1px solid red"});
		redLine = true;
		console.log(redLine);
		
		$("*").each(function(){
			let name = $(this).attr("id");
			if(name) 
			{
				$(this).append(`<span class="redline_span" style="position:absolute; top:0; left:0; font-size:1rem; color:red; opacity:0.8;">${name}</span>`);
				$(this).val(name);
			}
		});
		
	}
	else
	{
		$("*").css({outline:"none"});
		redLine = false;
		console.log(redLine);
		$("*").each(function(){
			let name = $(this).attr("id");
			if(name != "undifined") $(this).find(`.redline_span`).remove();
			$(this).val("");
		});
	}
}

//-- 팝업 불러오기 : 현재 페이지에 팝업을 불러온다
function popupControl(view, url='', callback=false, data='데이터 X') {
	console.log(`popupControl :${url}, ${view}, ${callback}, ${data}`);
	switch(view)
	{
		case 'show':
			$("#POPUP_VIEW").removeClass("hidden"); 
			$("#POPUP_VIEW").load(url,function(){
				setTimeout(()=>{$(".popup").css({top:'0vh'});},100);
			});
			break;
		case 'hide':
			$(".popup").css({top:'100vh'});
			setTimeout(()=>{$("#POPUP_VIEW").addClass("hidden");},500)
			break;
	}
	if(callback) {callback(data);}
}

//-- 로딩스크린 : 로딩화면 필요할때 콜백으로 사용합니다
function loadingScreen(v){
	if(v == "on")
	{ 
		$("#LOADING_SCREEN").stop().fadeIn();
	}
	else
	{
		setTimeout(()=>{$("#LOADING_SCREEN").stop().fadeOut()},1000);
	}
}

//카카오맵 검색기능
function searchKakaoAddress(address='강남대로 94길 34', itemName='상품명')
{
	var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
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
}

//-- REPLACE ALL
function replaceAll(str, searchStr, replaceStr) { return str.split(searchStr).join(replaceStr) }

//--핸드폰번호 설정
function setPhoneNo(phone_no) {
	if(phone_no.length<10) return "정보가 없습니다";
	var pl = phone_no.length;
	if (pl == 11) {
		//11자리 폰번호
		var p1 = phone_no.substr(0, 3);
		var p2 = phone_no.substr(3, 4);
		var p3 = phone_no.substr(7, 4);
		return p1 + '-' + p2 + '-' + p3;
	} else if (pl == 10) {
		//10자리 폰번호
		var p1 = phone_no.substr(0, 3);
		var p2 = phone_no.substr(4, 3);
		var p3 = phone_no.substr(6, 4);
		return p1 + '-' + p2 + '-' + p3;
	} else {
		//12자리 번호
		var p1 = phone_no.substr(0, 4);
		var p2 = phone_no.substr(4, 4);
		var p3 = phone_no.substr(8, 4);
		return p1 + '-' + p2 + '-' + p3;
	}
}

//--주민등록번호 설정
function setJumin(jumin) {
	if(jumin.length<6) return '정보가 없습니다';
	var ju1 = jumin.substr(0, 6);
	var ju2 = jumin.substr(7, 1) + '******';
	jumin = ju1 + '-' + ju2;
	return jumin;
}

//--활성창 바깥을 클릭하면 창을 닫는다. element로 query선택자를 받음
function OutsideClose(element) {
	$(document).mousedown(function (e) {
		var container = $(element);
		if (container.has(e.target).length === 0) {
			container.stop().fadeOut(200);
		}
	});
}

//-- 숫자 3자리 단위마다 콤마(comma) 찍기
function numComma(x) {
	x = Number(x);
	if (x || x == 0) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		return '';
	}
}

//-- 숫자만 입력
function inputNumber(target)
{
	console.log(target);
	console.log(target.value);
	target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

//-- 커스텀 알림박스
function customAlert(title='',content='',type="ok", time=2000)
{
	$(".ca_container").css({display:"flex"});
	$(".ca_box").stop().fadeIn(500).css({bottom:"5rem"});
	$(".ca_box").attr("type",`${type}`);
	if(content){$(".ca_box").html(`<div class="ca_title">${title}</div><div class="ca_content">${content}</div>`); }
  else {$(".ca_box").html(`<div class="ca_title">${title}</div>`);}
  console.log("alert title",title);
	
	setTimeout(()=>{ $(".ca_container, .ca_box").stop().fadeOut(500,function(){$(".ca_box").css({bottom:0}).html("");});},time);
}

//-- json Object 문자열로 변환
function jsonToStr(json){
	let istr = strJSON.stringify(json);
	return str;
}

//-- 문자열 json으로 변환
function strToJson(str){
	let json = JSON.parse(str);
	return json;
}

//-- 시리얼번호 이름으로 변경
function convertSerial(Serial)
{
	//층, 블럭위치 표시
	let vSerial 	= String(Serial).substr(8);
	let locationF = Number(vSerial.substr(0,3));
	let locationB = Number(vSerial.substr(3));

	return `${locationF}층 ${locationB}블럭`;
}

//-- 시리얼번호 이름으로 변경(전체)
function convertSerialAll(Serial)
{
	//층, 블럭위치 표시
	let vSerial 	= String(Serial).substr(3);
	// 01 002 001 001
	let 출구 = Number(vSerial.substr(0,2));
	let 건물 = Number(vSerial.substr(2,3));
	let 층 = Number(vSerial.substr(5,3));
	let 블럭 = Number(vSerial.substr(8,3));

	return `${출구}출구 ${건물}빌딩 ${층}층 ${블럭}블럭`;
}

//-- 스크립트파일 불러오기
function importScript(path)
{
	$(`script[src='${JS_PATH}${path}.js']`).remove();
	$('body').append(`<script src='${JS_PATH}${path}.js'><\/script>`);
	
}

//페이지 트랜지션
function pageTransition(url)
{
	$(`#PAGE_TRANSITION`).addClass("reveal");
	setTimeout(() => { 
		$("#PAGE_TRANSITION").removeClass("reveal"); 
		$("#PAGE_VIEW").load(`${url}`,function(){ $("#POPUP_VIEW").addClass("hidden");  });
	}, 1000);
}