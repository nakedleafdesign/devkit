<?php　,peffewfwf


date_default_timezone_set('Asia/Tokyo');

//get_template_part( './inc/inc', 'cpt' ); //カスタムポストタイプ追加
//get_template_part( './inc/inc', 'acf' ); //各カスタムフィールド追加
//get_template_part( './inc/inc', 'mce' );
//get_template_part( './inc/inc', 'siteacf' ); //サイト全般 カスタムフィールド追加

//不要なmetaタグを削除
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'noindex', 1 ); //robots
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

// ヘッダーから DNS プリフェッチのタグをすべて削除
function remove_dns_prefetch( $hints, $relation_type ) {
  if ( 'dns-prefetch' === $relation_type ) {
    return array_diff( wp_dependencies_unique_hosts(), $hints );
  }
  return $hints;
}
add_filter( 'wp_resource_hints', 'remove_dns_prefetch', 10, 2 );

// remove wp version param from any enqueued scripts
function vc_remove_wp_ver_css_js( $src ) {
  if ( strpos( $src, 'ver=' ) ) {
    $src = remove_query_arg( 'ver', $src );
  }

  return $src;
}

add_filter( 'style_loader_src', 'vc_remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'vc_remove_wp_ver_css_js', 9999 );


/**
 * add Image size Set
 */
//add_image_size('preview', 200 , 150 , true );
add_image_size('caseTopListImg', 300 , 260 , true );
add_image_size('square', 500 , 500 , true );
add_image_size('caseListImg', 550 , 1100 , true );
add_image_size('thumbnail', 480 , 360 , true );
add_image_size('maxSize', 900 , 600 , true );
//add_image_size('postEyeCatch', 600 , 400 , true );
//add_image_size('sideItem', 400 , 600 , false );
//add_image_size('flyer', 600 , 600 , false );
//add_image_size('fbnr', 644 , 214 , true );
//add_image_size('slideImg', 566 , 220 , true );


/**
 * ビジュアルエディタ用CSS
 */
add_editor_style('./css/editor-style.css');

function custom_editor_settings( $initArray ) {
  $initArray['body_class'] = 'editor-area';
  return $initArray;
}

add_filter( 'tiny_mce_before_init', 'custom_editor_settings' );


/**
 * '投稿'を変更
 */
function edit_admin_menus() {
  global $menu;
  global $submenu;
  $menu[5][0] = 'お知らせ'; // '投稿'を'その他'に変更
  $submenu['edit.php'][5][0] = 'お知らせ';
}
add_action( 'admin_menu', 'edit_admin_menus' );

/**
 * echo slug
 */
function the_slug($echo=true){
  $slug = basename(get_permalink());
  do_action('before_slug', $slug);
  $slug = apply_filters('slug_filter', $slug);
  if( $echo ) echo $slug;
  do_action('after_slug', $slug);
  return $slug;
}

/**
 * auto post slug name
 */
function auto_post_slug( $slug, $post_ID, $post_status, $post_type ) {
  if ( preg_match( '/(%[0-9a-f]{2})+/', $slug ) ) {
    $slug = utf8_uri_encode( $post_type ) . '-' . $post_ID;
  }
  return $slug;
}
add_filter( 'wp_unique_post_slug', 'auto_post_slug', 10, 4 );

/**
 * 投稿者アーカイブページへのアクセスを404ページへリダイレクト
 */
function author_archive_redirect() {
  if($_GET['author'] !== null) {
    wp_redirect( home_url('/404') );
    exit;
  }
}
add_action('init', 'author_archive_redirect');



// ダッシュボードウィジェット非表示
function example_remove_dashboard_widgets() {
  if (!current_user_can('level_10')) { //level10以下のユーザーの場合ウィジェットをunsetする
    global $wp_meta_boxes;
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']); // 現在の状況
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']); // 最近のコメント
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']); // 被リンク
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']); // プラグイン
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']); // クイック投稿
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']); // 最近の下書き
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']); // WordPressブログ
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']); // WordPressフォーラム
  }
}
add_action('wp_dashboard_setup', 'example_remove_dashboard_widgets');


//不要な管理画面サイドメニューを削除 (管理者以外)
function remove_menu() {
  remove_menu_page('link-manager.php');			// リンク
  if (!current_user_can('level_10')) { //level10以下のユーザーの場合ウィジェットをunsetする
// 		remove_menu_page('index.php');					// ダッシュボード
// 		remove_menu_page('edit.php');					// 投稿
// 		remove_menu_page('upload.php');					// メディア
    remove_menu_page('edit.php?post_type=page');	// 固定ページ
    remove_menu_page('edit-comments.php');			// コメント
    remove_menu_page('themes.php');					// 外観
// 		remove_menu_page('plugins.php');				// プラグイン
    remove_menu_page('users.php');					// ユーザー
    remove_menu_page('tools.php');					// ツール
    remove_menu_page('options-general.php');		// 設定
  }
}
add_action('admin_menu', 'remove_menu');


/**
 * Is SubPage?
 *
 * Checks if the current page is a sub-page and returns true or false.
 *
 * @param  $page mixed optional ( post_name or ID ) to check against.
 * @return boolean
 */
function is_subpage( $page = null ) {
  global $post;
  // is this even a page?
  if ( ! is_page() ) {
    return false;
  }
  // does it have a parent?
  if ( ! isset( $post->post_parent ) OR $post->post_parent <= 0 ) {
    return false;
  }
  // is there something to check against?
  if ( ! isset( $page ) ) {
    // yup this is a sub-page
    return true;
  } else {
    // if $page is an integer then its a simple check
    if ( is_int( $page ) ) {
      // check
      if ( $post->post_parent == $page ) {
        return true;
      }
    } else if ( is_string( $page ) ) {
      // get ancestors
      $parent = get_ancestors( $post->ID, 'page' );
      // does it have ancestors?
      if ( empty( $parent ) ) {
        return false;
      }
      // get the first ancestor
      $parent = get_post( $parent[0] );
      // compare the post_name
      if ( $parent->post_name == $page ) {
        return true;
      }
    }

    return false;
  }
}
add_filter( 'wp_unique_post_slug', 'auto_post_slug', 10, 4 );


/*
 * pagination
 *
 * @param $_all_page_num 前ページ数
 * @param $_show_item_range 表示するページネーション数
 *
 * <<first <prev 5 6 ⑦ 8 9 Next> Last>>
 * このようなページネーションだった場合、5 6 もしくは 8 9 の部分が
 * $_show_item_range数となる
 *
 */
function pagination($_all_page_num = '', $_show_item_range = 3) {
// $_show_item_range数から何ページ分ページネーションを作成するか計算する
  $showitems = ($_show_item_range) + 1;
// 現在のページ数(変数名変更不可)
  global $paged;
// 現在のページ数がなければ1ページ目とする
  if (empty($paged)) {
    $paged = 1;
  }
  // ページ数の指定が無かった場合
  if ($_all_page_num == '') {
    global $wp_query;
// 記事数を取得する
    $_all_page_num = $wp_query->max_num_pages;
// 記事数が取得できなかった場合
    if (!$_all_page_num) {
// 総ページ数は1とする
      $_all_page_num = 1;
    }
  }
// ページ数が2ページ以上の場合にページネーションを作成する
  if ($_all_page_num >= 1) {
// Page X of Y の表示
//		echo "<div class=\"pagination\"><span>Page ".$paged." of ".$_all_page_num."</span>";
    echo "<aside class=\"pagination\"><ul>";
// 一つ前に戻るボタン
    if ( $paged > 1
        && $showitems < $_all_page_num
    ) {
      echo "<li class=\"page-prev\"><a href='" . get_pagenum_link( $paged - 1 ) . "'><i class='fa fa-chevron-left'></i></a></li>";
    }
// 現在のページと、左右$_show_item_range分のボタン
    for ($i = 1; $i <= $_all_page_num; $i++){
      if (!($i >= $paged + $_show_item_range + 1 || $i <= $paged - $_show_item_range - 1)
          || $_all_page_num <= $showitems) {
// 現在のページ(クリックできない)
        if ($paged == $i) {
          echo "<li><a href='" . get_pagenum_link( $i ) . "' class='is-current'>" . $i . "</a></li>";
        } // 左右$_show_item_range分のボタン
        else {
          echo "<li><a href='" . get_pagenum_link( $i ) . "'>" . $i . "</a></li>";
        }
      }
    }
// 一つ進むボタン
    if ( $paged < $_all_page_num
        && $showitems < $_all_page_num
    ) {
      echo "<li class=\"page-next\"><a href=\"" . get_pagenum_link( $paged + 1 ) . "\"><i class='fa fa-chevron-right'></i></a></li>";
    }

    echo "</ul></aside>";
  }
}

/**
 * get_breadcrumbs();
 */
function get_breadcrumbs(){
  global $wp_query;

  if ( !is_home() ){

    // Start the UL
    echo '
	<section class="container breadcrumbs">
		<nav class="containerInnerLg">
			<ul class="breadcrumbsBody">';
    // Add the Home link
    echo '<li class="breadcrumbsItem"><a href="'. home_url( "/" ) .'">HOME</a></li>';

    if ( is_category() )
    {
      echo '<li class="breadcrumbsItem"><a href="' . home_url( '/news/' ) . '">新着情報</a></li>';
      echo '<li class="breadcrumbsItem"><span class="is-current">' . single_term_title('',false) . '</span></li>';
    }
    elseif ( is_search() ) {

      echo "<li class=\"breadcrumbsItem\"><span class=\"is-current\">Search Results</span></li>";
    }
    elseif ( is_404() )
    {
      echo "<li class=\"breadcrumbsItem\"><span class=\"is-current\">404 NOT FOUND</span></li>";
    }
    elseif ( is_page() )
    {
      $post = $wp_query->queried_object;
      if ( $post->post_parent == 0 ){

        echo "<li class=\"breadcrumbsItem\"><span class=\"is-current\">".the_title('','', FALSE)."</span></li>";

      } else {
        $title = the_title('','', FALSE);
        $ancestors = array_reverse( get_post_ancestors( $post->ID ) );
        array_push($ancestors, $post->ID);

        foreach ( $ancestors as $ancestor ){
          if( $ancestor != end($ancestors) ){
            echo '<li class="breadcrumbsItem"><a href="'. get_permalink($ancestor) .'">'. strip_tags( apply_filters( 'single_post_title', get_the_title( $ancestor ) ) ) .'</a></li>';
          } else {
            echo '<li class="breadcrumbsItem"><span class="is-current">'. strip_tags( apply_filters( 'single_post_title', get_the_title( $ancestor ) ) ) .'</span></li>';
          }
        }
      }
    }
    elseif ( is_singular('post') )
    {
      $category = get_the_category();
      $category_id = get_cat_ID( $category[0]->cat_name );

      echo '<li class="breadcrumbsItem">'. get_category_parents( $category_id, TRUE, "" ) . '</span></li>';
      echo '<li class="breadcrumbsItem"><span class="is-current">'. get_the_title() . '</span></li>';
    }
    elseif ( is_singular() )
    {
//			$category = get_the_category();
//			$category_id = get_cat_ID( $category[0]->cat_name );

//			echo '<li class="breadcrumbsItem">'. get_category_parents( $category_id, TRUE, "" ) . '</span></li>';
      echo '<li class="breadcrumbsItem"><span class="is-current">'. get_the_title() . '</span></li>';
    }
    elseif ( is_tag() )
    {
      echo "<li class=\"breadcrumbsItem\"><span class=\"is-current\">Tags</span></li>";
    }
    // End the UL
    echo "
			</ul>
		</nav>
	</section>
";
  }
}




/*
	アーカイブページで現在のカテゴリー・タグ・タームを取得する
*/
function get_current_term(){
  $id;
  $tax_slug;

  if(is_category()){
    $tax_slug = "category";
    $id = get_query_var('cat');
  }else if(is_tag()){
    $tax_slug = "post_tag";
    $id = get_query_var('tag_id');
  }else if(is_tax()){
    $tax_slug = get_query_var('taxonomy');
    $term_slug = get_query_var('term');
    $term = get_term_by("slug",$term_slug,$tax_slug);
    $id = $term->term_id;
  }

  return get_term($id,$tax_slug);
}



//
////カスタム投稿等のアーカイブ表示件数制御
add_action( 'pre_get_posts', 'products_get_posts' );
function products_get_posts($query){
  if ( $query->is_main_query() && ! is_admin() && (is_post_type_archive('product') || is_tax('products') || is_post_type_archive('case') || is_tax('case'))){
    $query->set( 'posts_per_page', -1 );
  }
}



///**
// * カスタム投稿にカテゴリフィルターを追加
// */
function add_post_taxonomy_restrict_filter() {
  global $post_type;
  if ( 'event' == $post_type ) {
    ?>
    <select name="event-category">
      <option value="">カテゴリー指定なし</option>
      <?php
      $terms = get_terms('event-category');
      foreach ($terms as $term) { ?>
        <option value="<?php echo $term->slug; ?>"><?php echo $term->name; ?></option>
      <?php } ?>
    </select>
    <?php
  }elseif ( 'class' == $post_type ) {
    ?>
    <select name="class-category">
      <option value="">カテゴリー指定なし</option>
      <?php
      $terms = get_terms('class-category');
      foreach ($terms as $term) { ?>
        <option value="<?php echo $term->slug; ?>"><?php echo $term->name; ?></option>
      <?php } ?>
    </select>
    <?php
  }
}
//add_action( 'restrict_manage_posts', 'add_post_taxonomy_restrict_filter' );


// 一覧ソート適用
function set_post_types_admin_order( $wp_query ) {
  if (is_admin()) {

    $post_type = $wp_query->query['post_type'];

    if ( $post_type == 'event' || $post_type == 'class' ) {
      if(!$_GET['orderby']){
        $wp_query->set('orderby', 'meta_value');
        $wp_query->set('meta_key', 'date');
        $wp_query->set('order', 'desc');
      }else{
        if($wp_query->query['orderby'] == 'title'){
          $wp_query->set('orderby', 'title');
        }elseif($wp_query->query['orderby'] == 'date'){
          $wp_query->set('orderby', 'date');
        }else{
          $wp_query->set('orderby', 'meta_value');
          $wp_query->set('meta_key', 'date');
          if($wp_query->query['order'] != 'asc'){
            $wp_query->set('order', 'desc');
          }
        }
      }
    }
  }
}
//add_filter('pre_get_posts', 'set_post_types_admin_order');




/**
 * Custom Field Get for Term & Category
 *
 * @param $term
 * @param $fieldName
 *
 * @return mixed|null|void
 */
function get_term_acf ( $term , $fieldName ){
  $term_slug = get_query_var($term);
  $term_ID = get_term_by('slug',$term_slug, $term )->term_id;
  $return = get_field( $fieldName, $term . '_'.$term_ID);
  return $return;
}

// @ 抜粋
// ------------------------------------------------------------

// 字数を100文字に指定する
function my_excerpt_mblength($length) {
  return 30;
}
add_filter('excerpt_mblength', 'my_excerpt_mblength');

// 本文からの抜粋末尾の文字列を指定する
//概要（抜粋）の省略文字
function my_excerpt_more($more) {
  return '…';
}
add_filter('excerpt_more', 'my_excerpt_more');
