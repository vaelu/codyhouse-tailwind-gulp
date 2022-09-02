'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-easy-import');
const tailwindNesting = require('@tailwindcss/nesting');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');

const cssIndex = 'dev/css/_index.css';
const cssDest = 'public/css/';
const cssFileName = 'styles.css';
const jsUtilSrc = 'node_modules/codyhouse-framework/main/assets/js/util.js';
const jsComponentsSrc = 'dev/js/components/**/*.js';
const jsCustomSrc = 'dev/js/custom.js';
const jsDest = 'public/js/'
const jsFileName = 'scripts.js';
const htmlSrc = 'dev/html/**/*.html'
const htmlDest = 'public/';
const imgSrc = 'dev/img/**/*';
const imgDest = 'public/img/';
const watcher = [htmlSrc, 'dev/css/**/*.css', 'dev/js/**/*.js'];

gulp.task('css', function() {
    const processors = [
        postcssImport,
        tailwindNesting,
        tailwind,
    ];
    return gulp.src(cssIndex)
    .pipe(postcss(processors))
    .pipe(rename(cssFileName))
    .pipe(gulp.dest(cssDest));
});

gulp.task('js', function() {
    return gulp.src([jsUtilSrc, jsComponentsSrc, jsCustomSrc])
    .pipe(concat(jsFileName))
    .pipe(gulp.dest(jsDest));
});

gulp.task('watch', function() {
    gulp.watch(watcher, gulp.series(['css', 'js']));
});

gulp.task('deploy-css', function() {
    const processors = [
        //autoprefixer,
        cssnano({preset: ['default', {discardComments: {removeAll: true}}]})
    ];
    return gulp.src(cssDest + cssFileName)
    .pipe(postcss(processors))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(cssDest));
});

gulp.task('deploy-js', function() {
    return gulp.src(jsDest + jsFileName)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(jsDest));
});

gulp.task('deploy-img', function() {
    return gulp.src(imgSrc)
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest));
});

gulp.task('deploy-html', function() {
    return gulp.src(htmlSrc)
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
    .pipe(replace('../../public/css/styles.css', 'css/styles.min.css'))
    .pipe(replace('../../public/js/scripts.js', 'js/scripts.min.js'))
    .pipe(replace('../img/', 'img/'))
    .pipe(gulp.dest(htmlDest));
});

gulp.task('watch', gulp.series(['css', 'js', 'watch']))
gulp.task('deploy', gulp.series(['deploy-css', 'deploy-js', 'deploy-img', 'deploy-html']));
gulp.task('default', gulp.series('watch'));