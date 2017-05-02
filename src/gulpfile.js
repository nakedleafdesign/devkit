  // ------------------------------------------------------------
// require
// ------------------------------------------------------------
var gulp        = require('gulp');
var $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    });
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
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


// ------------------------------------------------------------
// scssコンパイル
// ------------------------------------------------------------

var browsers = [
    '> 3%'
];
gulp.task('scss', function(){
    gulp.src(srcDir + assetsDir + 'scss/**/*.scss')
        .pipe($.plumber({
            errorHandler: $.notify.onError("Error: <%= error.message %>")
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass(
            {
              functions: assetFunctions({
                images_path: assetsDir + '/img',
                http_images_path: "/img"
              })
            }
        ))
        .pipe($.postcss([
            // require('doiuse')({browsers: browsers}),
            // todo:ignoreする https://liginc.co.jp/206518
            require('autoprefixer')({browsers: browsers}),
            require('css-mqpacker')
        ]))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(distDir +  assetsDir + 'css/'))
});

// ------------------------------------------------------------
// scss lint
// ------------------------------------------------------------

gulp.task( 'scss-lint', function() {
	return gulp.src(srcDir + assetsDir + 'scss/**/*.scss')
    .pipe($.sassLint({
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0
      },
      files: {ignore: srcDir + assetsDir + 'lib/**/*.scss'},
      configFile: '.sass-lint.yml'
    }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
} );


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

// ------------------------------------------------------------
// @ js結合・圧縮
// ------------------------------------------------------------

gulp.task('js',function(){
    // form
    gulp.src(srcDir + assetsDir + 'js/form/lib/*.js')
        .pipe($.concat('validate.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir + assetsDir + 'js/form/'));
    gulp.src(srcDir + assetsDir + 'js/form/*.js')
        .pipe($.concat('form.js'))
        .pipe(gulp.dest(distDir + assetsDir + 'js/form/'));
    // vender
    gulp.src(srcDir + assetsDir + 'js/vender/*.js')
        .pipe($.concat('vender.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir + assetsDir + 'js/'));
    // jquery    
    gulp.src(srcDir + assetsDir + 'js/_jquery.js')
        .pipe($.concat('jquery.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir + assetsDir + 'js/'));
    gulp.src( srcDir + assetsDir + 'js/!(_)*.js') //パーシャルを除外
        .pipe(gulp.dest(distDir + assetsDir + 'js/'))
});
//    gulp.src([srcDir + assetsDie + 'js/*.js','!' + srcDir + assetsDie + 'js/**/_*.js']) //パーシャルを除外

// ------------------------------------------------------------
// @ $copy
// ------------------------------------------------------------


gulp.task('copy', function() {
    gulp.src(srcDir + htmlDir + '**/*.html')
        .pipe(gulp.dest(distDir))
        .pipe(browserSync.stream());
    gulp.src(srcDir + assetsDir + 'img/**/*')
        .pipe(gulp.dest(distDir + assetsDir +'img'))
        .pipe(browserSync.stream());
    gulp.src(srcDir + assetsDir + 'fonts/**/*')
        .pipe(gulp.dest(distDir + assetsDir + 'fonts'))
        .pipe(browserSync.stream());
  gulp.src(srcDir + assetsDir + 'js/lib/**/*')
      .pipe(gulp.dest(distDir + assetsDir + 'js/lib/'))
      .pipe(browserSync.stream());
});

// ------------------------------------------------------------
// @ $browser-sync
// ------------------------------------------------------------

gulp.task('bs', function() {
    browserSync({
        server: {
            baseDir: distDir,
        }
    });
});

// ------------------------------------------------------------
// @ $bs-reload
// ------------------------------------------------------------

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// ------------------------------------------------------------
// ejs
// ------------------------------------------------------------
var ejs = require("gulp-ejs");
gulp.task("ejs", function() {
    gulp.src( ["ejs/**/*.ejs",'!' + "ejs/**/_*.ejs"] )
    .pipe($.plumber())
       .pipe($.ejs())
       .pipe($.rename({extname: '.html'}))
        .pipe(gulp.dest(distDir)) 
});

// @ $watch
// ------------------------------------------------------------

gulp.task('watch', function () {
    if(sassLintFlag){
    gulp.watch(srcDir + assetsDir + 'scss/**/*.scss', ['scss','hologram','scss-lint','bs-reload']);
    } else {
    gulp.watch(srcDir + assetsDir + 'scss/**/*.scss', ['scss','hologram','bs-reload']);
    }
    gulp.watch(srcDir + assetsDir + 'js/**/*.js', ['js','bs-reload']);
    gulp.watch(srcDir + assetsDir + 'html/**/*.html', ['copy','bs-reload']);
    gulp.watch(srcDir + assetsDir + 'img/**/*.{png,jpg,jpeg,gif,svg,ico,cur}', ['copy','bs-reload']);
    gulp.watch(srcDir + assetsDir + 'fonts/**/*.*', ['copy','bs-reload']);
    gulp.watch(srcDir + 'ejs/**/*.*', ['ejs','bs-reload']);
//     gulp.watch("../**/*.*").on('change', browserSync.reload);
});


gulp.task('run', function (callback) {
    runSequence(
        'bs',
        'watch',
        callback);
});
