// 라우트 어플리케이션 생성
var app = Sammy(function () {
	
	//기본
	this.get("/index.html", function () {});

	//메인페이지
	this.get("/", function () { pageTransition(`${PAGE_PATH}/introduce/3d_perform/index.html`); });

	//--회사소개 /introduce/

	//인사말 
	this.get("#/greetings", function () { pageTransition(`${PAGE_PATH}/introduce/greetings.html`); });

	//회사조직도
	this.get("#/organization", function () { pageTransition(`${PAGE_PATH}/introduce/organization.html`); });

	//회사연혁
	this.get("#/history", function () { pageTransition(`${PAGE_PATH}/introduce/history.html`); });

	//등록현황
	this.get("#/registry", function () { pageTransition(`${PAGE_PATH}/introduce/registry.html`); });

	//장비현황
	this.get("#/equipment", function () { pageTransition(`${PAGE_PATH}/introduce/equipment.html`); });

	//회사위치
	this.get("#/location", function () { pageTransition(`${PAGE_PATH}/introduce/location.html`); });

  //3D PERFORM
	this.get("#/3d_perform", function () { pageTransition(`${PAGE_PATH}main.html`); });
	// this.get("#/3d_perform", function () { pageTransition(`${PAGE_PATH}/introduce/3d_perform/index.html`); });
	// this.get("#/3d_perform", function () { pageTransition(`${PAGE_PATH}/introduce/3d_perform/index.html`); });

	//--안전진단 /safe/

	//건축 안전진단 
	this.get("#/safe_construct", function () { pageTransition(`${PAGE_PATH}/safe/safe_construct.html`); });

	//토목 안전진단
	this.get("#/safe_civil", function () { pageTransition(`${PAGE_PATH}/safe/safe_civil.html`); });

	//엔지니어링
	this.get("#/engineering", function () { pageTransition(`${PAGE_PATH}/safe/engineering.html`); });

	//특허&신기술 개발
	this.get("#/3d", function () { pageTransition(`${PAGE_PATH}/safe/3d.html`); });

	
	//--기계설비 점검 /check/

	//기계설비 점검
	this.get("#/check_machine", function () { pageTransition(`${PAGE_PATH}/check/check_machine.html`); });

	//점검실적
	this.get("#/check_performance", function () { pageTransition(`${PAGE_PATH}/check/check_performance.html`); });

	//신기술 개발
	this.get("#/development", function () { pageTransition(`${PAGE_PATH}/check/development.html`); });


	//-- 건설 공사 /construct/
	//건축공사
	this.get("#/work_construction", function () { pageTransition(`${PAGE_PATH}/construct/work_construction.html`); });

	//보수보강공사
	this.get("#/work_repair", function () { pageTransition(`${PAGE_PATH}/construct/work_repair.html`); });

	//방수공사
	this.get("#/work_waterproof", function () { pageTransition(`${PAGE_PATH}/construct/work_waterproof.html`); });


	//--상담문의 /consult/
	//상담/견적
	this.get("#/consult", function () { pageTransition(`${PAGE_PATH}/consult/consult.html`); });

	//채용안내
	this.get("#/employment", function () { pageTransition(`${PAGE_PATH}/consult/employment.html`); });

	//공지사항
	this.get("#/notice", function () { pageTransition(`${PAGE_PATH}/consult/notice.html`); });


	//-- 3d 안전진단 > 특


	//404
	this.notFound = function (verb, path) { $("#PAGE_VIEW").html("404, 페이지 못찾음"); };
});

//어플리케이션 시작
$(function () {
	app.run();
});