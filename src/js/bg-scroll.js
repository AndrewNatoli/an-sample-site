function scrollEvent(){
  var yPos = $(window).scrollTop();
  var el = $('#header-bg');
  var height = el.height()-200;
  el.css('backgroundPosition-y', ((height - yPos) * 0.02) +  'px');
}

$(window).bind('scroll', scrollEvent);
scrollEvent();