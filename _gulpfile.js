//===============================================================
// config
//===============================================================
config = {
   "name" : "wakugumi-starter-kit",
   "path": {
      "source": "./source",
      "dist": "./dist",            
      "screenshot": "./screenshot",
      "styleguide": "./lib/hologram",
      "sass": "/assets/sass",
      "css": "/css",
      "img": "/assets/img",
      "svg": "/assets/svg",
      "js": "/assets/js",
      "docs": "/docs",
      "dev": "/dev"
   }
};
//===============================================================
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-scss-lint');
var csso = require('gulp-csso'); // css圧縮
var postcss = require('gulp-postcss');
//===============================================================

// @Sassウォッチ = $ gulp
//------------------------------------------------------------------------------------------------------------------------------
 
gulp.task('default', function () {
    return gulp.watch([config.path.source + config.path.sass + '*.scss'],['css']);
});

// @Sassコンパイル = $ gulp
//------------------------------------------------------------------------------------------------------------------------------
var browsers = [
    '> 2%'
];
gulp.task('css', function () {
    return gulp.src('./source/assets/sass/*.scss')
        .pipe(sass())
.pipe(postcss([
            require('cssnano') ({autoprefixer: false}),
            require('doiuse')({browsers: browsers}),
            require('autoprefixer') ({browsers: browsers}),
            require('css-mqpacker')
        ]))
        .pipe(csso()) // css圧縮
        .pipe(gulp.dest(config.path.dist + config.path.css));
});

// @SassLint = $ gulp sass-lint
//------------------------------------------------------------------------------------------------------------------------------
gulp.task('sass-lint', function () {
    return gulp.src('./source/assets/sass/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});
    
