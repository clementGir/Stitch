var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    package = require('./package.json');    


gulp.task('css', function () {
    return gulp.src('src/scss/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js-libraries',function(){
  gulp.src('src/js/libraries/*.js')
    .pipe(uglify())
    .pipe(concat('libraries.min.js'))
    .pipe(gulp.dest('app/assets/js/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js-app-libraries',function(){
  gulp.src('src/js/app/app-libraries/*.js')
    .pipe(uglify())
    .pipe(concat('app-libraries.min.js'))
    .pipe(gulp.dest('app/assets/js/app'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js-home',function(){
  gulp.src('src/js/home/*.js')
    .pipe(uglify())
    .pipe(concat('home.min.js'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js-devices',function(){
  gulp.src('src/js/devices/*.js')
    .pipe(uglify())
    .pipe(concat('devices.min.js'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js-app',function(){
  gulp.src('src/js/app/*.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('app/assets/js/app'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'start.dev:8888'
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('default', ['css', 'js-libraries', 'js-app-libraries', 'js-home', 'js-devices', 'js-app', 'browser-sync'], function () {
    gulp.watch("src/scss/*.scss", ['css']);    
    gulp.watch("src/js/libraries/*.js", ['js-libraries']);
    gulp.watch("src/js/app/app-libraries/*.js", ['js-app-libraries']);
    gulp.watch("src/js/home/*.js", ['js-home']);
    gulp.watch("src/js/devices/*.js", ['js-devices']);
    gulp.watch("src/js/app/*.js", ['js-app']);
    gulp.watch("app/*.php", ['bs-reload']);
    gulp.watch("app/views/*.php", ['bs-reload']);
});