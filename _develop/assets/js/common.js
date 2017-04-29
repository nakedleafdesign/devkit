var tabW = 768;
var activeClass = 'is-active';

$(function () {

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

  // @ fadein content
  // ------------------------------------------------------------

  var showFlag = false;
  var topBtn = $('.js-fixed-fnav');
  topBtn.css('bottom', '-100px');


  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {

      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({'bottom': '0px'}, 200);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({'bottom': '-100px'}, 200);
      }
    }
  });


  $('.to-top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  // @ tab-menu
  // ------------------------------------------------------------

  /*
   tab menu

   <div>
   <a href="javascript:void(0)" class="btn-round" data-tab-content="trigger" rel="tab1">hoge</span></a>
   <a href="javascript:void(0)" class="btn-round" data-tab-content="trigger" rel="tab2">fuga</span></a>
   <a href="javascript:void(0)" class="btn-round" data-tab-content="trigger" rel="tab3">piyo</span></a>
   </div>
   <div>
   <a href="" rel="tab1"></a>
   <div id="tab1" data-tab-content="tab-content">
   コンテンツ
   </div>
   <a href="" rel="tab2"></a>
   <div id="tab2" class="events-container" data-tab-content="tab-content">
   コンテンツ
   </div>
   </div>

   */

  // RefillsのVERTICAL TABSを参考

  var tContent = $('.js-tab-menu-content'); //.js-vertical-tab-contentを置き換え
  var tTrigger = $('.js-tab-menu-trigger'); //.js-vertical-tabを置き換え
  var tHeading = '[data-tab-content="heading"]'; //.js-vertical-tab-accordion-headingを置き換え

  tContent.hide();
  tContent.first().show();
  tTrigger.first().addClass('is-active');

  /* if in tab mode */

  tTrigger.click(function (event) {
    event.preventDefault();

    tContent.hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).show();

    tTrigger.removeClass(activeClass);
    $(this).addClass(activeClass);

    $(tHeading).removeClass(activeClass);
    $("[rel^='" + activeTab + "']").addClass(activeClass);
  });

  /* if in accordion mode */

  $(tHeading).click(function (event) {
    event.preventDefault();

    $(theading).hide();
    var accordion_activeTab = $(this).attr("rel");
    $("#" + accordion_activeTab).show();

    $(theading).removeClass(activeClass);
    $(this).addClass(activeClass);

    tTrigger.removeClass(activeClass);
    $("[rel^='" + accordion_activeTab + "']").addClass(activeClass);
  });


  // @ tel link
  // ------------------------------------------------------------

  /*doc
   ---
   title: スマホのみ電話リンク
   name: js-tel-link
   category: js
   ---


   ```html_example

   <span class="js-tel-link">00-0000-0000</span>

   ```

   */


  var jsTelLinkTarget = $('.js-tel-link');
  var ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0){
    jsTelLinkTarget.each(function(){
      var str = $(this).text();
      $(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
    });
  }

  // @ hiraku.js
  // ------------------------------------------------------------

  $(".js-offcanvas").hiraku({
    btn: ".js-offcanvas-btn",
    fixedHeader: ".js-header-fixed",
    direction: "right",
    breakpoint: 769
  });

  /* @ tile.js
  // ------------------------------------------------------------ */
  // 参考 : http://urin.github.io/jquery.tile.js/


  if ($('.js-tile').length) {
    $('.js-tile').tile();
    $(window).resize(function () {
      $('.js-tile').tile();
    });
  }
  if ($('.js-tab-menu').length) {
    $('.js-tab-menu').tile();
    $(window).resize(function () {
      $('.js-tile').tile();
    });
  }


  /* @ accorion
  // ------------------------------------------------------------ */

  var accordionCotainer = '.js-accordion';
  var accordionTrigger = '.js-accordion-trigger';
  var accordionContent = '.js-accordion-content';

  $(accordionContent).hide();
  $(accordionTrigger).on('click touch',function () {
    $(this).toggleClass(activeClass);
    $(this).closest(accordionCotainer).find(accordionContent).slideToggle();
  });


});