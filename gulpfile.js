var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('browserify', function() {
    gulp.src('app/js/main.js')
      .pipe(browserify({transform:'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('copy', function() {
    gulp.src('app/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['sass', 'browserify', 'copy'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html", ['copy']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
