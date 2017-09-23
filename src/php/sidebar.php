<section class="block-secondary">
  <aside class="side-module side-bnr-group">
    <h2 class="side-heading01">Ashglow SNS</h2>
    <div class="side-bnr-item"><a href="https://twitter.com/Ashglow?lang=ja" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/bnr_twitter.jpg" alt="Twitter"></a></div>
    <div class="side-bnr-item"><a href="https://www.instagram.com/ashglow.official/?hl=ja" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/bnr_istagram.jpg" alt="Instagram"></a></div>
  </aside>
  <aside class="side-module side-list-group">
    <h2 class="side-heading01">News Index</h2>
    <ul class="side-list-body">
      <?php
      $query = new WP_Query(array(
          'posts_per_page' => 6,
          'post_type' => 'post',
          'category_name' => 'news',
          'post_status' => 'publish',
      ));
      $itemPostId = $post->ID;
      if($query->have_posts()):
        while($query->have_posts()) : $query->the_post(); ?>
          <?php setup_postdata($post);?>
          <?php if($itemPostId == $post->ID) { ?>
            <li class="side-list-item is-current"><?php the_title(); ?></li>
          <?php }else{ ?>
            <li class="side-list-item"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
          <?php } ?>
        <?php endwhile; ?>
      <?php else : ?>
        <li class="side-list-item">現在投稿はありません</li>
      <?php endif; ?>
      <?php wp_reset_postdata(); /* クエリリセット */ ?>
    </ul>
  </aside>
  <aside class="side-module side-bnr-group">
    <h2 class="side-heading01">Sound Cloud</h2>
    <iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/178413224&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
  </aside>
</section>