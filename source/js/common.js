$(function() {

	var tabW = 768;

	// @ js-nav-trigger
	// ------------------------------------------------------------
	$('.js-nav-trigger').on('click', function() {
		$(this).toggleClass('is-active');
		$('.gnav').toggleClass('is-active');
		$(window).on('resize',function(){
			var winW = $(window).width();
			if(tabW < winW){
				$('.js-nav-trigger').removeClass('is-active');
				$('.gnav').removeClass('is-active');
			}
		});
	});
	// @ ページ内リンクスムーススクロール
	// ------------------------------------------------------------
	$('a[href^="#"]').click(function() {
		var speed = 400; // ミリ秒
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

	// @ page-top
	// ------------------------------------------------------------

	var showFlag = false;
	var topBtn = $('.js-page-top');
	topBtn.css('bottom', '-100px');

	$(window).on('load resize', function(){
		var winW = $(window).width();
		if(tabW > winW) {

			$(window).scroll(function () {
				if ($(this).scrollTop() > 250) {

					if (showFlag == false) {
						showFlag = true;
						topBtn.stop().animate({'bottom': '15px'}, 200);
					}
				} else {
					if (showFlag) {
						showFlag = false;
						topBtn.stop().animate({'bottom': '-100px'}, 200);
					}
				}
			});
		}
	});
	topBtn.click(function () {
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

	var tContent = '[data-tab-content="tab-content"]'; //.js-vertical-tab-contentを置き換え
	var tTrigger = '[data-tab-content="trigger"]'; //.js-vertical-tabを置き換え
	var tHeading = '[data-tab-content="heading"]'; //.js-vertical-tab-accordion-headingを置き換え

	$(tContent).hide();
	$(tContent).first().show();
	$(tTrigger).first().addClass('is-active');

	/* if in tab mode */

	$(tTrigger).click(function(event) {
		event.preventDefault();

		$(tContent).hide();
		var activeTab = $(this).attr("rel");
		$("#"+activeTab).show();

		$(tTrigger).removeClass("is-active");
		$(this).addClass("is-active");

		$(tHeading).removeClass("is-active");
		$("[rel^='"+activeTab+"']").addClass("is-active");
	});

	/* if in accordion mode */

	$(tHeading).click(function(event) {
		event.preventDefault();

		$(theading).hide();
		var accordion_activeTab = $(this).attr("rel");
		$("#"+accordion_activeTab).show();

		$(theading).removeClass("is-active");
		$(this).addClass("is-active");

		$(tTrigger).removeClass("is-active");
		$("[rel^='"+accordion_activeTab+"']").addClass("is-active");
	});

});