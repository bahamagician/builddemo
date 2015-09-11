// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('assets/styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('_css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('_css'))
        .pipe(notify({
            message: "SASS Compiled"
        }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'assets/components/jquery/dist/jquery.js',
        'assets/js/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('_js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('_js'))
        .pipe(notify({
            message: "JS Compiled"
        }));
});
gulp.task('reload', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts', 'reload']);
    gulp.watch('assets/styles/*.scss', ['sass', 'reload']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'reload']);