'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import changed from 'gulp-changed';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import path from '../paths';

gulp.task('sass', () => {
	return gulp.src(path.app.styles)
		.pipe(changed(path.tmp.styles), {extension: '.scss'})
		.pipe(sourcemaps.init())
		.pipe(sass({style: 'compressed'}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('..maps'))
		.pipe(gulp.dest(path.tmp.styles))
		.pipe(filter('**/*.css'))
		.pipe(browserSync.reload({stream: true}));
});