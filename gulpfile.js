/* 引入包 */
var gulp      = require('gulp');
var connect   = require('gulp-connect');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var less      = require('gulp-less');
var rename    = require('gulp-rename');

/* html */
gulp.task('html', function() {
  gulp.src('./test/*.html')
      .pipe(connect.reload());
});

/* js */
gulp.task('js', function() {
  gulp.src('./src/js/*.js')
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/js/'))
      .pipe(connect.reload());

  gulp.src('./src/js/vendor/*.js')
      .pipe(concat('vendor.bundle.js'))
      // .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/js/'))
      .pipe(connect.reload());
});

/* css */
gulp.task('css', function() {
  gulp.src('./src/css/**/*.css')
      .pipe(concat('vendor.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./dist/css/'))
      .pipe(connect.reload());
})

/* less */
gulp.task('less', function() {
  gulp.src('./src/less/esp.less')
      .pipe(less())
      .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());
});

/* 服务器 */
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

/* 文件监听 */
gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./test/**/*.html', ['html']);
})

/* 默认任务 */
gulp.task('default', ['html', 'js', 'css', 'less', 'watch', 'connect']);