var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('browserify', function() {
    return gulp.src('app/js/main.js')
        .pipe(browserify({transform:'reactify'}))
        .pipe(uglify())
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
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('serve', ['sass', 'browserify', 'copy', 'fonts'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/scss/*.scss", ['sass', 'fonts']);
    gulp.watch("app/js/main.js", ['browserify']);
    gulp.watch("app/*.html", ['copy']);
});

gulp.task('default', ['serve']);
