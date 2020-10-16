//gulpfile.js

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    newer = require('gulp-newer'), 
    notify  = require('gulp-notify'),
    imagemin = require('gulp-imagemin');
    merge = require('gulp-merge-json');
    autoprefixer = require('gulp-autoprefixer');

//style paths
var sassFiles = 'styles/sass/**/*.scss',
    cssDest = 'styles/';

/**
 * Styles
*/
gulp.task('styles', gulp.series(function(){
    gulp.src(sassFiles)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
}));

/**
 * Images
*/
gulp.task('images', gulp.series(function() {

// Add the newer pipe to pass through newer images only
    return  gulp.src(['location/*/*.{png,jpg,gif}'])
                .pipe(newer('location/*/'))
                .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
                .pipe(gulp.dest('location/'))
                .pipe( notify( { message: 'Images task complete', onLast: true } ) );
}));
gulp.task('merge', gulp.series(function(){

    gulp.src('location/*/*.json')
    .pipe(merge({
        fileName: 'events.json',
        concatArrays: true,
        mergeArrays: true
    }))
    .pipe(gulp.dest('./json/all-events'));

}));
gulp.task('watch',gulp.series(function() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //gulp.watch('location/*/*/*.jpg', ['images']).on('change', browserSync.reload);
    //gulp.watch(sassFiles,['styles']).on('change', browserSync.reload);
    //gulp.watch("*.html").on('change', browserSync.reload);
}));

gulp.task('build', gulp.series(['styles', 'images', 'merge']));

