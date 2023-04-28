$(function(){
	var url = 'pop_rank'; 
	// setTimeout(function(){ popupControl('show',`${POPUP_PATH+url}.html`); },1300);

	//메뉴버튼
	$(`#MENU_ICON`).click(function (){ 
		$('header').toggleClass("white");
		$('.ui-line-box').toggleClass("white");
	})

	
	$("#MENU li").click(function(){ $("#MODAL").click(); });

	$(`ul.menu > li`).hover(
		function(){$("#MENU_TEXT").text($(this).find("span").text());},
		function(){
      $("#MENU_TEXT").text("MENU");
      let selected = $("ul.menu > li.selected");
      if(selected.length > 0){ $("#MENU_TEXT").text(selected.find("span").text())}
	});

	$(`ul.submenu > li`).hover(
		function(){$("#SUBMENU_TEXT").text($(this).text());},
		function(){
      $("#SUBMENU_TEXT").text("메뉴 네비게이션");
      let selected = $("ul.submenu > li.selected");
      if(selected.length > 0){ $("#SUBMENU_TEXT").text(selected.text())}
	});

  $(`ul.menu > li`).click(function(){
    $(`ul.menu > li`).removeClass("selected");
    $(this).addClass("selected");
  });

  $(`ul.submenu > li`).click(function(){
    $(`ul.submenu > li`).removeClass("selected");
    $(this).addClass("selected");
  });

	//닫기버튼 : 팝업공통 닫기
	$(`.btn_close`).click(function(){
		popupControl('hide')
	});

	//팝업버튼 : 팝업공통 불러오기
	$(`.btn_nav`).click(function(){
		let pro = window.location.protocol;
		let host =  window.location.host;
		let path = window.location.pathname;
		let pageUrl = $(this).attr("page");
		let popUrl  = $(this).attr("popup");
		let urlFull = `${pro}//${host+path}#/${pageUrl}`;

		console.log("pro :",pro);
		console.log("host :",host);
		console.log("path :",path);
		console.log('urlFull : ',urlFull);
		
		// return;
		
		if(popUrl) popupControl('show',`${POPUP_PATH+popUrl}.html`);
		if(pageUrl) location.href = urlFull;
		
	});

	$("#GO_MARKET").click(function(){
		location.href = 'https://mever.me/sto/market';
	});

	//상품명 검색
	$(`#BTN_SEARCH_ITEM`).click(function (){
		location.href='#/search';
		searchText = $(`#SEARCH_ITEM_NAME`).val();
		kakaoItemMap(searchText);
	});
	
});

/*contents-panel*6*/
 /*contents*/


