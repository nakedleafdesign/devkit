var activeFlag = 'is-active';

$(function () {
  $('.js-youtube-slider').sliderPro({
    width: 320,
    height:180,
    arrows: true,
    buttons: false,
    slideDistance:20,
    visibleSize: '100%',
    imageScaleMode : 'contain',
    shuffle:true,
    autoHeight:true,
    breakpoints: {
      415: {//表示方法を変えるサイズ
        width: '75%',
        slideDistance:10
      }
    }
  });



  $(".js-instagram-slider-item-wrap").text("Instagram timeline loading...");
  $.ajax({
    url: "https://api.instagram.com/v1/users/self/media/recent",
    data: {access_token: "4593572693.66f42ee.85db8b1969534f858c3049bdca2b5931"},
    dataType: "jsonp",
    error: function (jqXHR, textStatus, errorThrown) {
      $(".js-instagram-slider-item-wrap").text(textStatus);
    },
    success: function (data, textStatus, jqXHR) {
      $(".js-instagram-slider-item-wrap").text("");
      for (var i = 0, length = 12; i < length; i++) {
        var d = data.data[i];
        $(".js-instagram-slider-item-wrap").append(
            $("<div>").addClass("sp-slide").append($("<a>").attr("href", d.link).attr("target", "_blank").append($("<img>").addClass("sp-image").attr("src", d.images.thumbnail.url))));
      }

      // @ 読み込み完了後にスライダーを起動
      // ------------------------------


      $('.js-instagram-slider').sliderPro({
        width: 180,
        height:180,
        arrows: true,
        buttons: false,
        slideDistance:15,
        visibleSize: '100%',
        imageScaleMode : 'contain',
        shuffle:true,
        autoHeight:true,
        breakpoints: {
          415: {//表示方法を変えるサイズ
            width: '25%',
            slideDistance:10
          }
        }
      });
    }
  });






});