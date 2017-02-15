'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import seq from 'gulp-sequence';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import del from 'del';

gulp.task('build:babel', function () {
    return gulp.src('src/app/*.js')
               .pipe(babel())
               .pipe(gulp.dest('dist'));
});

gulp.task('copy:views', function () {
    return gulp.src('src/app/views/**/*')
               .pipe(gulp.dest('dist/views'));
});

gulp.task('clean:app', function () {
    gutil.log('Cleaning:', gutil.colors.red('dist/**/*'));
    return del('dist/**/*');
});

gulp.task('clean', ['clean:app']);
gulp.task('build', ['build:babel', 'copy:views']);

gulp.task('default', seq('clean', 'build'));