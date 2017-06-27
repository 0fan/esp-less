/* 引入包 */
var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    less      = require('gulp-less'),
    rename    = require('gulp-rename'),
    del       = require('del'),
    sequence  = require('gulp-sequence');

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
  gulp.src('./src/js/*.js')
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/js/'))
      .pipe(connect.reload());
});

/* jsVendor */
gulp.task('jsVendor', () => {
  return gulp.src('./src/js/vendor/*.js')
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
             .pipe(less())
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