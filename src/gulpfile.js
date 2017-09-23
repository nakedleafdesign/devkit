//========================================================================
//config
//========================================================================

config = {
  "name" : "ashglow",   //プロジェクト名
  "path": {             //各ディレクトリのパス
    "source": "./",
    "dist": "../dist/",
    "styleguile":"../docs/styleguide/",
    "cms":"../cms/",
    "ejs": "ejs/",
    "sass": "assets/scss/",
    "css": "assets/css/",
    "img": "assets/img/",
    "svg": "assets/svg/",
    "wp_assets":"assets/wp_assets/",
    "html": "./",
    "php":"php/",
    "js": "assets/js",
    "file": "assets/file/",
    "fonts": "assets/fonts/",
    "bower" : "../bower_components/",
    "dummy" : "assets/dummy/",
    "node" : "node_modules/",
    "cms_dir":"wordpress/",
    "cms_theme":"wp-content/themes/ashglow/"
  },
  "mode":{
    static:true,         // 静的モード
    cms:false,             // CMSモード
    cmstype:"wordpress",  // 使用するCMSの種類
    html:false,           // htmlを使用する場合
    ejs:true              // ejsを使用する場合
  }
};

//========================================================================
// @ require
//========================================================================

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var del = require("del");
var assetFunctions = require('node-sass-asset-functions');


//========================================================================
// scss コンパイルタスク
//========================================================================

var browsers = [
    '> 3%'
];

// @ Sassコンパイルタスクを関数化
// ------------------------------

function scssCompile(distDir) {
  gulp.src(config.path.source + config.path.sass + '/**/*.scss')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      }))
      .pipe($.sourcemaps.init())
      .pipe($.sass())
      .pipe($.postcss([
        // require('doiuse')({browsers: browsers}),
        // todo:ignoreする https://liginc.co.jp/206518
        require('autoprefixer')({browsers: browsers}),
        require('css-mqpacker')
      ]))
      // ▼ 出力CSSを難読化させる場合はコメントアウトを外す
      .pipe($.csso())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(distDir))
}

// @ 静的用Sassコンパルタスク
// ------------------------------

gulp.task('scss', function(){
  scssCompile(config.path.dist + config.path.css);
  scssCompile(config.path.styleguile + config.path.css);
});

// @ CMS用Sassコンパルタスク
// ------------------------------

gulp.task('cms.scss', function(){
  scssCompile(config.path.cms + config.path.cms_dir + config.path.cms_theme + config.path.css);
  scssCompile(config.path.styleguile + config.path.css);
});


//========================================================================
// @ Hologram | スタイルガイドジェネレーター
//========================================================================

// 参照、出力先は ./hologram/config.yml にて設定

gulp.task('hologram', function() {
    return gulp.src('./hologram/config.yml')
        .pipe($.hologram());
});


//========================================================================
// @ js結合・圧縮
//========================================================================

//@ 関数化
//------------------------------------------------------------

function jsCompile(distDir) {
  // jquery
  gulp.src(config.path.source + config.path.node + 'jquery/dist/jquery.js') //node_moduleからファイルを読み込み
  // .pipe($.uglify()) //難読化の場合はコメントアウトを外す
      .pipe(gulp.dest(distDir));

  // form.js | フォームバリデーション関係Js
  gulp.src([config.path.source + config.path.js + '/form/lib/*.js',config.path.source + config.path.js + '/form.js'])
      .pipe($.concat('form.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(distDir));

  //vender | ブラウザ対応等のJs
  gulp.src(config.path.source + config.path.node + 'flexibility/flexibility.js') //node_moduleからファイルを読み込み
      .pipe($.concat('vender.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(distDir));

  //通常
  gulp.src([config.path.source + config.path.js + '/!(_)*.js','!' + config.path.source + config.path.js + '/lib/*.js']) //パーシャルを除外
      .pipe($.uglify())
      .pipe(gulp.dest(distDir))

}

// @ 静的用
// ------------------------------

gulp.task('js',function(){
  jsCompile(config.path.dist + config.path.js);
  jsCompile(config.path.styleguile + config.path.js);
});

// @ CMS用
// ------------------------------

gulp.task('cms.js',function(){
  jsCompile(config.path.cms + config.path.cms_dir + config.path.cms_theme + config.path.js);
  jsCompile(config.path.styleguile + config.path.js);
});



//========================================================================
// @ $画像最適化
//========================================================================

// @ 関数化
// ------------------------------------------------------------

function imagemin(distDir){
  gulp.src(config.path.source + config.path.img +  "/**/*.jpg")
      .pipe($.imagemin())
      .pipe(gulp.dest(distDir));
  gulp.src(config.path.source + config.path.img +  "/**/*.png")
      .pipe($.imagemin())
      .pipe(gulp.dest(distDir));
}

// @ 静的用
// ------------------------------
gulp.task('imagemin', function(){
  imagemin(config.path.dist + config.path.img)
  imagemin(config.path.styleguile + config.path.img)
});

// @ CMS用
// ------------------------------
gulp.task('cms.imagemin', function(){
  imagemin(config.path.cms + config.path.cms_dir + config.path.cms_theme + config.path.img)
  imagemin(config.path.styleguile + config.path.img)
});


//========================================================================
// @ html
//========================================================================

// @ 静的用 | htmlディレクトリのhtmlファイルをdist先にコピー
// ------------------------------

gulp.task('copy.html',function () {
  var distDir = config.path.dist;
  //html
  gulp.src(config.path.source + config.path.html + '**/*.html')
      .pipe(gulp.dest(distDir))
      .pipe(browserSync.stream());
});

// @ CMS用 | htmlディレクトリのphpファイルをcms/theme先にコピー
// ------------------------------

// gulp.task('cms.copy.php',function () {
//   var distDir = config.path.cms + config.path.cms_dir + config.path.cms_theme + config.path.img;
//   //html
//   gulp.src(config.path.source + config.path.php + '**/*.php')
//       .pipe(gulp.dest(distDir))
//       .pipe(browserSync.stream());
// });

// @ 関数化
// ------------------------------

function copyAssets(distDir) {
  //fonts
  gulp.src(config.path.source + config.path.fonts + '/**/*')
      .pipe(gulp.dest(distDir + config.path.fonts))
      .pipe(browserSync.stream());

  //js library
  gulp.src(config.path.source + config.path.js + '/lib/**/*')
      .pipe(gulp.dest(distDir + config.path.js + '/lib/'))
      .pipe(browserSync.stream());

  //svg
  gulp.src(config.path.source + config.path.svg + '/**/*')
      .pipe(gulp.dest(distDir + config.path.svg))
      .pipe(browserSync.stream());

  //file
  gulp.src(config.path.source + config.path.file + '/**/*')
      .pipe(gulp.dest(distDir + config.path.file))
      .pipe(browserSync.stream());
}

// @ 静的用
// ------------------------------

gulp.task('copy.assets', function() {
  copyAssets(config.path.dist);
});

// @ CMS用
// ------------------------------

gulp.task('cms.copy.assets', function() {
  copyAssets(config.path.cms + config.path.cms_dir + config.path.cms_theme);
});


//========================================================================
// ejs | テンプレートエンジン
//========================================================================

var ejs = require("gulp-ejs");

// @ 関数化
// ------------------------------

function ejsFunction(distDir,fileType) {
  gulp.src([config.path.source + config.path.ejs + "/**/*.ejs",config.path.source + config.path.ejs + '!' + "/**/_*.ejs"])
      .pipe($.plumber())
      .pipe($.ejs())
      .pipe($.rename({extname: fileType}))
      .pipe(gulp.dest(distDir))
}

// @ 静的用
// ------------------------------
// mytodo : 構造見直し
// ./src/php/ ディレクトリに書き出す様に一旦指定

gulp.task("ejs.html", function () {
  if(config.mode.cms === true && config.mode.cmstype === "wordpress"){
    ejsFunction(config.path.source + config.path.php,'.php');
  }else{
    ejsFunction(config.path.dist,'.html');
  }
});

// @ CMS用 | wordpress
// ------------------------------
// mytodo : 構造見直し
// ./src/php/ ディレクトリに書き出す様に一旦指定

gulp.task("cms.ejs.php", function () {
  ejsFunction(config.path.source + config.path.php,'.php');
});

// @ CMS用 | a-blog cms
// ------------------------------

gulp.task("cms.ejs.html", function () {
  ejsFunction(config.path.cms + config.path.cms_dir + config.path.cms_theme,'.html');
});


//========================================================================
// @ cms.php | wordpress用テーマ作成時必要ファイル書き出し
//========================================================================


gulp.task("cms.php", function () {
  gulp.src(config.path.source + config.path.php + '/**/*')
      .pipe(gulp.dest(config.path.cms + config.path.cms_dir + config.path.cms_theme))
});


//========================================================================
// @ wp.assets | wordpress用テーマ作成時必要ファイル書き出し
//========================================================================

gulp.task('wp.assets',function () {
  // wordpress用 style.css 書き出し
  if(config.mode.cmstype === "wordpress") {
    gulp.src(config.path.source + config.path.wp_assets + '**/*.scss')
        .pipe($.sass())
        .pipe($.rename('style.css'))
        .pipe(gulp.dest(config.path.cms + config.path.cms_dir + config.path.cms_theme))

    gulp.src(config.path.source + config.path.wp_assets + '**/*.png')
        .pipe(gulp.dest(config.path.cms + config.path.cms_dir + config.path.cms_theme))
  }

});

//========================================================================
// @ $browser-sync | ローカルサーバー起動
//========================================================================

// @ 関数化
// ------------------------------

function bsFunction(distDir) {
  browserSync({
    server: {
      baseDir: distDir
    }
  });
}

// @ 静的用
// ------------------------------

gulp.task('bs', function() {
    bsFunction(config.path.dist);
});

// @ CMS用
// ------------------------------

gulp.task('cms.bs', function() {
  bsFunction(config.path.cms);
});

//========================================================================
// @ $bs-reload | オートリロード
//========================================================================

gulp.task('bs-reload', function () {
    browserSync.reload();
});

//========================================================================
// @ クリーン | ディレクトリ削除
//========================================================================

gulp.task('clean', function() {
  return del([config.path.dist],{force:true});
});

gulp.task('cms.clean', function() {
  return del([config.path.cms + config.path.cms_dir + config.path.cms_theme],{force:true});
});


//========================================================================
// @ $watch
//========================================================================

gulp.task('watch', function () {

  // @ 静的モードがtureの場合、以下のタスクを実行
  // ------------------------------------------------------------

  if(config.mode.static === true) {
  // ------------------------------
  gulp.watch(config.path.source + config.path.sass + '/**/*.scss', ['scss','hologram','bs-reload']);
  gulp.watch(config.path.source + config.path.js + '/**/*.js', ['js','bs-reload']);
  // ------------------------------
  gulp.watch(config.path.source + config.path.html + '/**/*.jpg', ['imagemin', 'bs-reload']);
  gulp.watch(config.path.source + config.path.html + '/**/*.png', ['imagemin', 'bs-reload']);
  gulp.watch(config.path.source + config.path.img + '/**/*.html', ['copy.html', 'bs-reload']);
  // ------------------------------
  gulp.watch(config.path.source + config.path.fonts + '/**/*.html', ['copy.assets', 'bs-reload']);
  gulp.watch(config.path.source + config.path.js + '/lib/**/*', ['copy.assets', 'bs-reload']);
  gulp.watch(config.path.source + config.path.svg + '/**/*', ['copy.assets', 'bs-reload']);
  gulp.watch(config.path.source + config.path.file + '/**/*', ['copy.assets', 'bs-reload']);
  // ------------------------------
    if(config.mode.ejs === true) { // ejsモードがtureの場合
      gulp.watch(config.path.source + config.path.ejs + '/**/*.ejs', ['ejs.html', 'bs-reload']);
    }
  }

  // @ CMSモードがtrueの場合
  // ------------------------------------------------------------

  if(config.mode.cms === true) {
    // ------------------------------
    gulp.watch(config.path.source + config.path.sass + '/**/*.scss', ['cms.scss','hologram','bs-reload']);
    gulp.watch(config.path.source + config.path.js + '/**/*.js', ['cms.js','bs-reload']);
    // ------------------------------
    gulp.watch(config.path.source + config.path.html + '/**/*.jpg', ['cms.imagemin', 'bs-reload']);
    gulp.watch(config.path.source + config.path.html + '/**/*.png', ['cms.imagemin', 'bs-reload']);
    // gulp.watch(config.path.source + config.path.img + '/**/*.html', ['cms.copy.html', 'bs-reload']);
    // ------------------------------
    gulp.watch(config.path.source + config.path.fonts + '/**/*.html', ['cms.copy.assets', 'bs-reload']);
    gulp.watch(config.path.source + config.path.js + '/lib/**/*', ['cms.copy.assets', 'bs-reload']);
    gulp.watch(config.path.source + config.path.svg + '/**/*', ['cms.copy.assets', 'bs-reload']);
    gulp.watch(config.path.source + config.path.file + '/**/*', ['cms.copy.assets', 'bs-reload']);
    // ------------------------------
    if(conifg.mode.ejs === true) { // ejsモードがtureの場合
      if(config.mode.cmstype === "acms") {
        gulp.watch(config.path.source + config.path.ejs + '/**/*.ejs', ['cms.ejs.html', 'bs-reload']);
      }else if(config.mode.cmstype === "wordpress"){
        gulp.watch(config.path.source + config.path.ejs + '/**/*.ejs', ['cms.ejs.php', 'bs-reload']);
      }
    }
  }
});


//========================================================================
// @ ローカルサーバー起動 監視タスクON
//========================================================================

gulp.task('run', function (callback) {
    runSequence(
        'bs',
        'watch',
        callback);
});

//========================================================================
// @ 全タスク実行
//========================================================================

gulp.task('build', function (callback) {
  if(config.mode.static === true && config.mode.ejs === false) {
    return runSequence(
        'clean',
        ['scss', 'hologram', 'js', 'copy.html', 'copy.assets'],
        'imagemin',
        callback
    );
  }else if(config.mode.static === true && config.mode.ejs === true){
    return runSequence(
        'clean',
        ['scss', 'hologram', 'js', 'ejs.html', 'copy.html', 'copy.assets'],
        'imagemin',
        callback
    );
  }

  if(config.mode.cms === true && config.mode.cmstype === "wordpress") {
    return runSequence(
        'cms.clean',
        ['cms.scss', 'hologram', 'cms.js','wp.assets','cms.php', 'cms.copy.assets'],
        'cms.imagemin',
        callback
    );
  }
  if(config.mode.cms === true && config.mode.cmstype === "acms") {
    return runSequence(
        'cms.clean',
        ['cms.scss', 'hologram', 'cms.js', 'cms.copy.assets'],
        'cms.imagemin',
        callback
    );
  }
});