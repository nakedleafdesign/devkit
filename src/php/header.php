<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="<?php bloginfo ('charset') ; ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--<meta name="viewport" content="width=1200">-->
  <title itemprop="name">Ashglow Official Web Site</title>
  <!-- Standard SEO -->
  <meta name="keywords" content="Ashglow,藤浪哲也,福岡,バンド,インディーズ,ギターロック">
  <!-- favicons -->
  <link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-16x16.png" sizes="16x16">
  <!-- stylesheets -->
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/lib/slider-pro/slider-pro.css" media="all">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css" media="all">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300i,400" rel="stylesheet">
  <!-- scripts -->
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/jquery.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/vender.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/common.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/index.js"></script>
  <!--  <script type="text/javascript" src="//typesquare.com/accessor/script/typesquare.js?pZix0spn~rE%3D" charset="utf-8"></script>-->
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib/jquery.sliderPro.min.js"></script>

  <script>
//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//
//    ga('create', 'UA-57958831-1', 'auto');
//    ga('send', 'pageview');
  </script>
  <?php wp_head(); ?>
</head>
<body>
<!--[if lt IE 10]>
<div class="ie-prompt">
  <p>お使いのブラウザはバージョンが古いため、サイトを快適にご利用いただけないかもしれません。<br>
    <a href="http://www.whatbrowser.org/intl/ja/">新しいブラウザをお試しできます。
      ブラウザは無料、インストールも簡単です。</a>
  </p>
</div>
<![endif]-->
<!--<section class="loader-layer js-loading-layer__layer">-->
<!--  <div class="loader-layer__container">-->
<!--    <div class="js-loading-layer__step01">-->
<!--      <div class="loader js-loading-layer__icon">-->
<!--        <div class="loader-inner pacman">-->
<!--          <div></div>-->
<!--          <div></div>-->
<!--          <div></div>-->
<!--          <div></div>-->
<!--          <div></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="js-loading-layer__step02">-->
<!--      <img class="loader-layer__logo" src="./assets/img/common/h-logo-black.png" alt="">-->
<!--    </div>-->
<!--  </div>-->
<!--</section>-->
<div class="content-container js-loading-layer__content">
<header class="container--full header js-header-hidden__header">
  <div class="header__inner<?php if ( is_home() ) { ?>--top<?php } ?> header-group">
    <a class="h-logo" href="<?php echo home_url( '/' ); ?>"></a>
    <div class="header-toggle js-header-toggle">
      <span class="top"></span>
      <span class="middle"></span>
      <span class="bottom"></span>
    </div>
    <nav class="gnav js-header-toggle-target">
      <ul class="gnav-body">
        <li class="gnav-item"><a href="/">TOP</a></li>
        <li class="gnav-item text-strike"><a href="javascript:void(0)">LIVE</a></li>
        <li class="gnav-item text-strike"><a href="javascript:void(0)">BIOGRAPHY</a></li>
        <li class="gnav-item text-strike"><a href="javascript:void(0)">DISCOOGRAPHY</a></li>
        <li class="gnav-item text-strike"><a href="javascript:void(0)">MEDIA</a></li>
        <li class="gnav-item text-strike"><a href="javascript:void(0)">CONTACT</a></li>
      </ul>
    </nav>
  </div>
</header>