/* 引入包 */
var gulp    = require('gulp');
var connect = require('gulp-connect');
var less    = require('gulp-less');

/* html */
gulp.task('html', function() {
  gulp.src('./test/*.html')
      .pipe(connect.reload());
});

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
  gulp.watch('./src/less/*.less', ['less']);
  gulp.watch('./test/*.html', ['html']);
})

/* 默认任务 */
gulp.task('default', ['html', 'less', 'watch', 'connect']);