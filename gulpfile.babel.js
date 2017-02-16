'use strict';

import gulp from 'gulp';
import seq from 'gulp-sequence';
import merge from 'merge-stream';
import del from 'del';
import _ from 'lodash';

import gutil from 'gulp-util';
import watch from 'gulp-watch';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import sass from 'gulp-sass';


gulp.task('clean:dist', function () {
    gutil.log('Cleaning:', gutil.colors.red('dist/**/*'));
    return del('dist/**/*');
});


gulp.task('build:app', function () {
    return gulp.src('src/app/*.js')
               .pipe(sourcemaps.init())
               .pipe(babel())
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('dist'));
});

gulp.task('copy:views', function () {
    return gulp.src('src/views/**/*')
        .pipe(gulp.dest('dist/views'));
});

const vendorSass = [
    './node_modules/bootstrap-sass/assets/stylesheets',
    './node_modules/font-awesome/scss'
];
gulp.task('build:styles', function () {
    return gulp.src('src/styles/*.{scss,sass}')
               .pipe(sourcemaps.init())
               .pipe(sass({includePaths: vendorSass}).on('error', sass.logError))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('dist/assets/css'));
});

const vendorJS = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap-sass/assets/javascripts/*.js'
];
gulp.task('build:scripts', function () {
    const es6 = gulp.src('src/scripts/*.js')
                    .pipe(sourcemaps.init())
                    .pipe(babel());
    const vendor = gulp.src(vendorJS);

    return merge(es6, vendor)
        .pipe(concat('bundle.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('copy:media', function () {
    return gulp.src('src/media/**/*.{jpg,jpeg,png}')
        .pipe(gulp.dest('dist/assets/media'));
});

const vendorFonts = [ './node_modules/font-awesome/fonts/*' ];
gulp.task('copy:fonts', function () {
    return gulp.src(vendorFonts)
        .pipe(gulp.dest('dist/assets/fonts'));
});


/* Watch these files for changes and run the task on update */
gulp.task('watch', () => {
    gulp.watch('src/app/*.js', ['build:app']);
    gulp.watch('src/views/**/*.{hbs,html}', ['copy:views']);
    gulp.watch('src/styles/*.{scss,sass}', ['build:styles']);
    gulp.watch('src/scripts/*.js', ['build:scripts']);
});


gulp.task('clean', ['clean:dist']);
gulp.task('build', ['build:app', 'copy:views', 'build:styles', 'build:scripts', 'copy:media', 'copy:fonts']);

gulp.task('develop', seq('clean', 'build', 'watch'));
gulp.task('default', seq('clean', 'build'));