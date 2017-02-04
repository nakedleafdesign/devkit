// ------------------------------------------------------------
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var postcss     = require('gulp-postcss');
// ------------------------------------------------------------


// sassコンパイルタスク
var browsers = [
    '> 3%'
];
gulp.task('sass', function(){
    gulp.src('./source/scss/**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            // require('doiuse')({browsers: browsers}),
            // todo:ignoreする https://liginc.co.jp/206518
            require('autoprefixer')({browsers: browsers}),
            require('css-mqpacker')
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

// @ $copy
// ------------------------------------------------------------


gulp.task('copy', function() {
    gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
    gulp.src('./source/js/**/*.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});



// @ $browser-sync
// ------------------------------------------------------------

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            //対象ディレクトリ
            baseDir: "./dist/",
            reloadDelay: 3000

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

// watchタスク(html,js,sassファイル変更時に実行するタスク)
gulp.task('watch', ['sass','browser-sync'], function(){
    var watcher = gulp.watch('./source/scss/**/*.scss', ['sass']);
    var watcher = gulp.watch('./source/**/*.html', ['copy']);
    gulp.watch("./source/**/*.html",['bs-reload']);
    gulp.watch("./source/scss/**/*.scss",['bs-reload']);
    gulp.watch("./source/js/**/*.js",['bs-reload']);


});

gulp.task('default', ['watch','copy','browser-sync']);