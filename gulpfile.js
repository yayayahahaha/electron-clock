var gulp = require('gulp');
var scss = require('gulp-sass');
var compass = require('compass-importer')

scss.compiler = require('node-sass');

gulp.task('scss', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(scss({
            importer: compass
        }))
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('scss:watch', function() {
    gulp.watch('./scss/**/*.scss', gulp.series('scss'));
});