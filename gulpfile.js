// ------------------------------------------------------------
var gulp        = require('gulp');
var $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    });
var notify      = require('gulp-notify');
var hologram    = require('gulp-hologram');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

// ------------------------------------------------------------


// sassコンパイルタスク
var browsers = [
    '> 3%'
];
gulp.task('sass', function(){
    gulp.src('./source/scss/**/*.scss')
        .pipe($.plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.postcss([
            // require('doiuse')({browsers: browsers}),
            // todo:ignoreする https://liginc.co.jp/206518
            require('autoprefixer')({browsers: browsers}),
            require('css-mqpacker')
        ]))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'))
});


// @ スタイルガイドジェネレーター
// ------------------------------------------------------------

gulp.task('hologram', function() {
    return gulp.src('hologram/config.yml')
        .pipe($.hologram());
});


// @ js結合・圧縮
// ------------------------------------------------------------

gulp.task('js',function(){
    gulp.src('./source/js/form/lib/*.js')
        .pipe($.concat('lib.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js/form/'))
    gulp.src('./source/js/form/*.js')
        .pipe($.concat('form.js'))
        .pipe(gulp.dest('./dist/js/form/'))
    gulp.src('./source/js/vender/*.js')
        .pipe($.concat('vender.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js/'))
    gulp.src('./source/js/_jquery.js')
        .pipe($.concat('jquery.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js/'))
    gulp.src(['./source/js/*.js','!./source/js/**/_*.js']) //パーシャルを除外
        .pipe(gulp.dest('./dist/js'))
});


// @ $copy
// ------------------------------------------------------------


gulp.task('copy', function() {
    gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

    gulp.src('./source/img/**/*')
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.stream());
    gulp.src('./source/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
});



// @ $browser-sync
// ------------------------------------------------------------

gulp.task('bs', function() {
    browserSync({
        server: {
            baseDir: "./dist/",
        }
    });
});

// @ $bs-reload
// ------------------------------------------------------------

gulp.task('bs-reload', function () {
    browserSync.reload();
});



// @ $watch
// ------------------------------------------------------------

gulp.task('watch', function () {
    gulp.watch('./source/scss/**/*.scss', ['sass','hologram']);
    gulp.watch('./source/js/**/*.js', ['js']);
    gulp.watch('./source/**/*.html', ['copy']);
    gulp.watch('./source/img/*.*', ['copy']);
    gulp.watch('./source/fonts/*.*', ['copy']);

    gulp.watch("./dist/**/*.*").on('change', browserSync.reload);
});


gulp.task('run', function (callback) {
    runSequence(
        'bs',
        'watch',
        callback);
});