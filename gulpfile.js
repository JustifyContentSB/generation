let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify-es').default;

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('script', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('scss', function() {
    return gulp.src('app/scss/index/style.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer('last 5 versions'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css/index'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "app",
            index: 'index-2.html'
        }
    });
});

// INDEX
// gulp.task('js', function() {
//     return gulp.src(['node_modules/slick-carousel/slick/slick.js', 
//         'node_modules/magnific-popup/dist/jquery.magnific-popup.js'])
//     .pipe(concat('libs.min.js'))
//     .pipe(terser())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({stream: true}))
// });

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/**/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', 'browserSync', 'watch'));