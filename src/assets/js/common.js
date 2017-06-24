var tabW = 768;
var spW = 414;
var activeClass = 'is-active';



$(function () {

  // @ ヘッダー非表示 js-header-hidden
  // ------------------------------------------------------------

  var $header = $('.js-header-hidden__header');
  var $mainContent = $('.js-header-hidden__content');
  var mainContentPos = $mainContent.offset().top;
  var mainContentPosH = mainContentPos - $header.height()/2;
  var winW = $(window).width();
  var fadeTime = 300;


  $(window).scroll(function () {
    if (winW > spW) {
      var winScrollTop = $(window).scrollTop();
      if (mainContentPosH < winScrollTop) {
        // $header.addClass('is-hidden');
        $header.fadeOut(fadeTime);

      } else {
        // $header.removeClass('is-hidden');
        $header.fadeIn(fadeTime);
      }
    }
  });

  // @ ページ内リンクスムーススクロール
  // ------------------------------------------------------------


  $('a[href^="#"]').click(function () {
    var speed = 400; // ミリ秒
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop: position}, speed, 'swing');
    return false;
  });


  // @ to-top
  // ------------------------------------------------------------

  var showFlag = false;
  var topBtn = $('.js-to-top');
  topBtn.css('bottom', '-100px');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {

      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({
          'bottom': '20px'
        }, 400);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({
          'bottom': '-100px'
        }, 400);
      }
    }
  });

  $('.to-top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  // @ hiraku.js
  // ------------------------------------------------------------

  // $(".js-offcanvas").hiraku({
  //   btn: ".js-offcanvas-btn",
  //   fixedHeader: ".js-header-fixed",
  //   direction: "right",
  //   breakpoint: 769
  // });
  


  // @
  // ------------------------------------------------------------

  // var $loadLayer = $('.js-loading-layer__layer');
  // var $loadContent = $('.js-loading-layer__content');
  // var $loadIcon = $('.js-loading-layer__icon');
  // var $step01 = $('.js-loading-layer__step01');
  // var $step02 = $('.js-loading-layer__step02');
  //
  // setTimeout(function(){
  //   $loadIcon.addClass('icon-level-warning');
  // },3000);
  // setTimeout(function(){
  //   $loadIcon.removeClass('icon-level-warning').addClass('icon-level-danger');
  // },10000);
  //
  // var winH = $(window).height();
  //
  // $loadContent.css('opacity','0');
  // $step02.css('display','none');
  // $loadLayer.height(winH).css('display','block');
  //
  // $(window).load(function () {
  //   setTimeout(function(){
  //     $step01.fadeOut(800);
  //   },500);
  //   setTimeout(function () {
  //     $step02.fadeIn(800);
  //   },1300);
  //   setTimeout(function () {
  //     $loadLayer.stop().animate({
  //       width:'0',
  //       opacity:0
  //     }, {
  //       duration: 'slow',
  //       easing: 'swing',
  //       complete: function () {
  //         $(this).remove();
  //       }
  //     })
  //   },3100);
  //
  //
  //   $loadContent.css('opacity', '1');
  // });


  // @ header
  // ------------------------------------------------------------

  var $jsHeaderToggle = $('.js-header-toggle');
  var $jsHeaderToggleTarget = $('.js-header-toggle-target');
  var $jsHeaderToggleTime = 300;
  var $contentContainer = $('.content-container');

  var w = $(window).width();
  var x = 769;
  if (x >= w) {
    $jsHeaderToggleTarget.hide();
  }
  $jsHeaderToggle.on('click',function(){

    if ($(this).hasClass(activeClass)){
      $(this).removeClass(activeClass);
      $jsHeaderToggleTarget.fadeOut($jsHeaderToggleTime);


    } else {
      $(this).addClass(activeClass);
      $jsHeaderToggleTarget.addClass(activeClass).fadeIn($jsHeaderToggleTime);

    }
  });
  $(window).resize(function(){
    var w = $(window).width();
    var x = 769;
    if (x <= w) {
      $jsHeaderToggle.removeClass(activeClass);
      $jsHeaderToggleTarget.removeClass(activeClass).css({
        display:'block'
      });
    } else {
      $jsHeaderToggle.removeClass(activeClass);
      $jsHeaderToggleTarget.hide();
    }
  });
});