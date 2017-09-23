<?php

// @ デフォルトタイムゾーンを設定
// ------------------------------------------------------------
date_default_timezone_set('Asia/Tokyo');

// @ 不必要なMETAタグ類を削除
// ------------------------------------------------------------
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

// @ 自動挿入されるDNSプリフェッチ用コードを削除
// ------------------------------------------------------------
function remove_dns_prefetch($hints, $relation_type){
  if ('dns-prefetch' === $relation_type) {
    return array_diff(wp_dependencies_unique_hosts(), $hints);
  }
  return $hints;
}
add_filter('wp_resource_hints', 'remove_dns_prefetch', 10, 2);

// @ JSやCSSに自動で付与されるバージョン番号を非表示に
// ------------------------------------------------------------
function vc_remove_wp_ver_css_js( $src ) {
  if ( strpos( $src, 'ver=' ) )
    $src = remove_query_arg( 'ver', $src );
  return $src;
}
add_filter( 'style_loader_src', 'vc_remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'vc_remove_wp_ver_css_js', 9999 );

// @ 管理画面メニューカスタマイズ
// ------------------------------------------------------------
function edit_admin_menus() {
  global $menu;
  global $submenu;

  $menu[5][0] = 'News';
  $submenu['edit.php'][5][0] = 'ニュース';
}
add_action( 'admin_menu', 'edit_admin_menus' );

// @ スラッグ 出力
// ------------------------------------------------------------
function the_slug($echo = true){
  $slug = basename(get_permalink());
  do_action('before_slug', $slug);
  $slug = apply_filters('slug_filter', $slug);
  if ($echo) echo $slug;
  do_action('after_slug', $slug);
  return $slug;
}

// @ 抜粋
// ------------------------------------------------------------
function new_excerpt_mblength($length) {
return 50;
}
add_filter('excerpt_mblength', 'new_excerpt_mblength');

function new_excerpt_more($more) {
  return '…';
}
add_filter('excerpt_more', 'new_excerpt_more');