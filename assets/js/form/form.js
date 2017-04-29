$(function() {

	// @ form周り
	// ------------------------------------------------------------

	$(".js-form").validationEngine({});

	$.fn.autoKana('#fld-name01', '#fld-name02', {
		katakana : true  //true：カタカナ、false：ひらがな（デフォルト）
	});

	$('.js-postcode').jpostal({
		postcode : [
			'#fld-zip'
		],
		address : {
			'#fld-address'  : '%3%4%5'
		}
	});
});

//window
//window load時
//-----------------------------------
// $(window).load(function () {
// });
//リサイズされたら
//-----------------------------------
// $(window).resize(function () {
// });
// load & リサイズされたら
//-----------------------------------
// $(window).on('load resize', function(){
// });

//document ready時
//-----------------------------------
// $(document).ready(function () {
// });






