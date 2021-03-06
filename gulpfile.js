/* 引入包 */
var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifyCSS    = require('gulp-minify-css'),
    less         = require('gulp-less'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    sequence     = require('gulp-sequence'),
    browserify   = require('gulp-browserify'),
    sourcemap    = require('gulp-sourcemaps'),
    babel        = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer');

/* clean */
gulp.task('clean', (cb) => {
  return del('./dist/**/*', cb);
});

/* html */
gulp.task('html', () => {
  return gulp.src(['./src/html/**/*.html'])
             .pipe(gulp.dest('./dist/'))
             .pipe(connect.reload());
});

/* js */
gulp.task('js', () => {
  return gulp.src('./src/js/app.js')
             // .pipe(sourcemap.write('.'))
             .pipe(babel())
             .pipe(browserify({
                transform: ['babelify']
              }))
             // .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             // .pipe(sourcemap.write('.'))
             .pipe(gulp.dest('./dist/js/'))
             .pipe(connect.reload());
});

/* jsVendor */
gulp.task('jsVendor', () => {
  return gulp.src([
                './src/js/vendor/jquery-1.9.1.min.js',
                './src/js/vendor/framework7.min.js',
                './src/js/vendor/underscore-min.js',
                './src/js/vendor/store.everything.min.js',
                './src/js/vendor/signature_pad.min.js',
                './src/js/vendor/iscroll.js'
              ])
             .pipe(concat('vendor.bundle.js'))
             // .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('./dist/js/'))
             // .pipe(connect.reload());
});

/* css */
gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
             .pipe(concat('vendor.min.css'))
             // .pipe(minifyCSS())
             .pipe(gulp.dest('./dist/css/'))
             // .pipe(connect.reload());
})

/* less */
gulp.task('less', () => {
  return gulp.src('./src/less/esp.less')
             // .pipe(sourcemap.init())
             .pipe(less())
             .pipe(autoprefixer({
               browsers: ['> 0.01%']
              }))
             .pipe(minifyCSS())
             // .pipe(rename({
             //   suffix: '.min'
             // }))
             // .pipe(sourcemap.write('.'))
             .pipe(gulp.dest('./dist/css'))
             .pipe(connect.reload());
});

/* font */
gulp.task('font', () => {
  return gulp.src('./src/font/**')
             .pipe(gulp.dest('./dist/font/'));
  
});

/* img */
gulp.task('img', () => {
  return gulp.src('./src/img/**')
             .pipe(gulp.dest('./dist/img/'));
  
});

/* 服务器 */
gulp.task('connect', () => {
  connect.server({
    livereload: true
  });
});

/* 文件监听 */
gulp.task('watch', () => {
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch(['./src/html/**/*.html'], ['html']);
})

/* 默认任务 */
gulp.task('default', ['clean'], () => {
  sequence('html','jsVendor', 'js', 'css', 'less', 'font', 'img', 'connect', 'watch')();
});