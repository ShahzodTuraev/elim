$(function(){
  //스크롤 설정
$("#CHAT_LIST").easeScroll({
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

  $(document).on('click','.chat-item',function(){
    $(`#CHAT_DIALOGUE`).css({top:0});
  })

  $(document).on('click','#BTN_CHAT_LEFT',function(){
    $(`#CHAT_DIALOGUE`).css({top:'100%'});
  })
});