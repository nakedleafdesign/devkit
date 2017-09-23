<?php get_header(); ?>
<section class="container--full main-visual"></section>
<main class="top-main-container js-header-hidden__content">
  <section class="container--full sec-brand">
    <article class="container__inner">
      <div class="section-heading01-unit sec-brand-heading-unit">
        <p class="section-heading01__head">Introduction</p>
        <h1 class="section-heading01">「僕たちは表現し、伝え、探し続ける」</h1>
        <p class="section-heading01__lead">We express, convey our thoughts, keep looking for</p>
      </div>
      <div class="sec-brand-grid-group">
        <div class="grid text-unit sec-brand-text-unit">
          <p>もうまよわない  かざらない<br>
          僕たちがつくるのは<br>
          あなたの暮らしを揺さぶる<br>
            どこまでも強烈で劇的な音楽</p>
          <p>鼓膜がふるえ  うごきをわすれ<br>
          "なにか"を見つけられたなら<br>
            ともにつくろう  ともにうたおう</p>
          <p>あなたのあしたに亀裂がはいる<br>
            ヨルとアサの境界を羽ばたいてゆく</p>
        </div>
        <div class="grid text-unit sec-brand-text-unit">
          <p>I will not forget to stop by now<br>
          What we make is<br>
          Shake your life<br>
            Strong and dramatic music everywhere</p>
          <p>Hold my eardrum tremble.<br>
          If you could find "something"<br>
            Let's both sing together</p>
          <p>There is a crack in your tomorrow<br>
            Fluttering the boundary between Jor and Asa</p>
        </div>
      </div>
    </article>
  </section>
  <section class="container--full sec-live">
    <article class="container__inner">
      <div class="section-heading01-unit sec-live-heading-unit">
        <p class="section-heading01__head--white ">Live</p>
        <h1 class="section-heading01--white">「Live Schedule」</h1>
        <p class="section-heading01__lead--white">Ashglow Live Infomation</p>
      </div>
      <p class="nopost-live">Coming Soon</p>
    </article>
  </section>

  <section class="container--full sec-media">
    <article class="container__inner">
      <div class="section-heading01-unit sec-media-heading-unit">
        <p class="section-heading01__head">Media</p>
        <h1 class="section-heading01">「Media」</h1>
        <p class="section-heading01__lead">Ashglow Media Infomation</p>
      </div>
    </article>
    <h1 class="heading03 heading03--top text-center">- Youtube -</h1>
    <div class="js-youtube-slider">
      <div class="sp-slides">
        <div class="sp-slide">
          <a href="https://www.youtube.com/watch?v=gxoCYzFVlSo" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/gxoCYzFVlSo/mqdefault.jpg"/>
          </a>
        </div>
        <div class="sp-slide">
          <a href="https://www.youtube.com/watch?v=KkR72NDWB3s" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/KkR72NDWB3s/mqdefault.jpg"/>
          </a>
        </div>
        <div class="sp-slide">
          <a href="https://www.youtube.com/watch?v=yyobGggGLB0" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/yyobGggGLB0/mqdefault.jpg"/>
          </a>
        </div>
        <div class="sp-slide">
          <a href="https://www.youtube.com/watch?v=bAFhLzsthgA" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/bAFhLzsthgA/mqdefault.jpg"/>
          </a>
        </div>
        <div class="sp-slide">
          <a href="https://www.youtube.com/watch?v=GCFJDWmKxj4" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/GCFJDWmKxj4/mqdefault.jpg"/>
          </a>
        </div>
        <div class="sp-slide">
          <a href="https://www.youtube.com/watch?v=tbgK15kY3UQ&t=30s" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/tbgK15kY3UQ/mqdefault.jpg"/>
          </a>
        </div>
      </div>
    </div>
    <h1 class="heading03 heading03--top text-center">- Instagram -</h1>
    <div class="js-instagram-slider">
      <div class="sp-slides js-instagram-slider-item-wrap">
        <div class="sp-slide">
          <a href="" target="_blank">
            <img class="sp-image" src="http://i.ytimg.com/vi/gxoCYzFVlSo/mqdefault.jpg"/>
          </a>
        </div>
      </div>
    </div>
  </section>
  <section class="container--full sec-news">
    <article class="container__inner">
      <div class="section-heading01-unit sec-news-heading-unit">
        <p class="section-heading01__head ">News</p>
        <h1 class="section-heading01">「News Information」</h1>
      </div>
      <div class="sec-news-grid-group">

        <?php
        $query = new WP_Query(array(
            'posts_per_page' => 6,
            'post_type' => 'post',
            'category_name' => 'news',
            'post_status' => 'publish',
        ));
        if($query->have_posts()):
          while($query->have_posts()) : $query->the_post(); ?>
            <article class="grid top-news-item">
              <a href="<?php the_permalink(); ?>">
                <p class="top-news-item__date"><?php the_time('Y.m.d'); ?></p>
                <div class="top-news-item__content">
                  <h1 class="top-news-item-content__ttl"><?php the_title(); ?></h1>
                  <p class="top-news-item-content__text"><?php the_excerpt(); ?></p>
                </div>
              </a>
            </article>
          <?php endwhile; ?>
        <?php else : ?>
          <article class="grid top-news-item">
            <a href="<?php the_permalink(); ?>">
              <p class="top-news-item__date">----</p>
              <div class="top-news-item__content">
                <h1 class="top-news-item-content__ttl">只今表示をする情報はありません。</h1>
              </div>
            </a>
          </article>
        <?php endif; ?>
        <?php wp_reset_postdata(); /* クエリリセット */ ?>

      </div>
    </article>
  </section>
</main>
<?php get_footer(); ?>








