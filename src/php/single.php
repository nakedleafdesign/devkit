<?php get_header(); ?>
<main class="main-container js-header-hidden__content">
  <?php if (have_posts()) { ?>
  <?php while (have_posts()) { the_post(); ?>
  <section class="key-visual">
    <div class="key-visual__inner">
      <div class="key-visual__unit">
        <h1 class="key-visual__title"><?php the_title(); ?></h1>
        <span class="key-visual__sub"><?php the_time('Y年m月j日') ?></span>
      </div>
    </div>
  </section>
  <div class="container">
    <div class="container__inner block-group">
      <section class="block-primary">
        <?php if(has_post_thumbnail()) { echo the_post_thumbnail(); } ?>
        <div class="entry">
        <?php the_content(); ?>
        </div>
        <?php }; ?>
        <nav class="pager">
          <?php previous_post_link_plus( array(
              'format' => '<div class="pager__item pager__item--prev">%link</div>',

              'in_same_tax' => true
          )); ?>
          <?php next_post_link_plus( array(
                  'format' => '<div class="pager__item pager__item--next">%link</div>',
                  'in_same_tax' => true
                )); ?>
        </nav>
        <?php } else { ?>
        <h1 class="heading01">記事が見つかりませんでした。</h1>
        <p>検索で見つかるかもしれません。</p><br />
        <?php get_search_form(); ?>
        <?php } ?>
      </section>
      <?php get_sidebar(); ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>








