// ------------------------------------------------------------
// require
// ------------------------------------------------------------
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var del = require("del");
var assetFunctions = require('node-sass-asset-functions');

// ------------------------------------------------------------
// config
// ------------------------------------------------------------

// Directorys
var srcDir = './';
var distDir = '../dist/';
var assetsDir = 'assets/';
var htmlDir = 'html/';

// flag

var sassLintFlag = false;

//========================================================================
//config
//========================================================================
config = {
  "name" : "devkit",
  "path": {
    "sharedSource" : "../",
    "source": "./",
    "dist": "../dist/",
    "ejs": "ejs",
    "sass": "/assets/scss",
    "css": "/assets/css",
    "img": "/assets/img",
    "svg": "/assets/svg",
    "html": "html",
    "js": "/assets/js",
    "file": "/assets/file",
    "fonts": "/assets/fonts",
    "bower" : "../bower_components/",
    "dummy" : "/assets/dummy",
    "node" : "node_modules/",
    // "docs": "/docs",
    // "dev": "/dev",
  }
};


//========================================================================
// scss コンパイルタスク
//========================================================================

var browsers = [
    '> 3%'
];

gulp.task('scss', function(){

  var distDir = config.path.dist + config.path.css;

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
        // .pipe($.csso())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(distDir))

});

// ------------------------------------------------------------
// Hologram
// ------------------------------------------------------------

// 参照、出力先は ./hologram/config.yml にて設定

gulp.task('hologram', function() {
    return gulp.src('./hologram/config.yml')
        .pipe($.hologram());
});


//--------------------------------[
// var sass-lint = false;
//
// function sassLintFlag(flag){
//     if (flag){
//         sass-lint = true;
//     } else {
//         sass-lint = false;
//     }
// }
//
//
// gulp.task('watch', function () {
//     sassLintFlag(false);
//
// });
//
// gulp.task('watch-lint', function () {
//     sassLintFlag(true);
//     gulp.watch(srcDir + assetsDir + 'scss/**/*.scss', ['sass','hologram','bs-reload']);
// });
//


//========================================================================
// @ js結合・圧縮
//========================================================================

gulp.task('js',function(){

  var distDir = config.path.dist + config.path.js;

    // jquery
    gulp.src(config.path.source + config.path.node + 'jquery/dist/jquery.js')
        .pipe($.uglify())
        .pipe(gulp.dest(distDir));

    // form.js
    gulp.src([config.path.source + config.path.js + '/form/lib/*.js',config.path.source + config.path.js + '/form.js'])
        .pipe($.concat('form.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir));

    //vender
    gulp.src(config.path.source + config.path.node + 'flexibility/flexibility.js')
        .pipe($.concat('vender.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir));

    //通常
    gulp.src([config.path.source + config.path.js + '/!(_)*.js','!' + config.path.source + config.path.js + '/lib/*.js']) //パーシャルを除外
        .pipe($.uglify())
        .pipe(gulp.dest(distDir))
});
   // gulp.src([srcDir + assetsDie + 'js/*.js','!' + srcDir + assetsDie + 'js/**/_*.js']) //パーシャルを除外


//========================================================================
// @ $画像最適化
//========================================================================

gulp.task('imagemin', function(){

  var distDir = config.path.dist + config.path.img;

  gulp.src(config.path.source + config.path.img +  "/**/*.jpg")
      .pipe($.imagemin())
      .pipe(gulp.dest(distDir));
  gulp.src(config.path.source + config.path.img +  "/**/*.png")
      .pipe($.imagemin())
      .pipe(gulp.dest(distDir));
});


//========================================================================
// @ $copy
//========================================================================

gulp.task('copy.html',function () {
  var distDir = config.path.dist;

  //html
  gulp.src(config.path.source + config.path.html + '**/*.html')
      .pipe(gulp.dest(distDir))
      .pipe(browserSync.stream());

});


gulp.task('copy', function() {

  var distDir = config.path.dist;


    //img
    gulp.src(config.path.source + config.path.img + '/**/*')
        .pipe(gulp.dest(distDir + config.path.img))
        .pipe(browserSync.stream());

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
});

//========================================================================
// @ $browser-sync
//========================================================================

gulp.task('bs', function() {
    browserSync({
        server: {
            baseDir: distDir,
        }
    });
});

//========================================================================
// @ $bs-reload
//========================================================================

gulp.task('bs-reload', function () {
    browserSync.reload();
});


//========================================================================
// ejs
//========================================================================
var ejs = require("gulp-ejs");

    var distDir = config.path.dist;
    gulp.task("ejs", function () {
      gulp.src([config.path.source + config.path.ejs + "/**/*.ejs",config.path.source + config.path.ejs + '!' + "/**/_*.ejs"])
          .pipe($.plumber())
          .pipe($.ejs())
          .pipe($.rename({extname: '.html'}))
          .pipe(gulp.dest(distDir))
});


//========================================================================
// del : buildで使用
//========================================================================
gulp.task('clean', del.bind(null, ['../dist'],{ force:true }));


// gulp.task('clean', function () {
//   // del([
//   //   config.path.dist,
//   //   { force:false }
//   // ]);
// });

//========================================================================
// @ $watch
//========================================================================

gulp.task('watch', function () {

    gulp.watch(config.path.source + config.path.sass + '/**/*.scss', ['scss','hologram','bs-reload']);
    gulp.watch(config.path.source + config.path.js + '/**/*.js', ['js','bs-reload']);
    gulp.watch(config.path.source + config.path.html + '/**/*.html', ['copy','bs-reload']);
    gulp.watch(config.path.source + config.path.ejs + '/**/*.*', ['ejs','bs-reload']);
    
});


//========================================================================
//========================================================================
//========================================================================
//========================================================================


gulp.task('run', function (callback) {
    runSequence(
        'bs',
        'watch',
        callback);
});


gulp.task('build', function (callback) {
  return runSequence(
      'clean',
      ['scss','hologram','js','ejs','copy.html','copy'],
      'imagemin',
      callback
  );
});