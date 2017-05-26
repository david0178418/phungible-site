const gulpCacheBust = require('gulp-cache-bust');
const gulpHtmlMin = require('gulp-htmlmin');
const gulp = require('gulp');
const gulpSquence = require('gulp-sequence');
const gulpWebpack = require('gulp-webpack');
const webpack2 = require('webpack');
const webpackConfig = require('./webpack.config');

function generateHtmlTask() {
	return gulp.src('./src/*.html')
		.pipe(gulpCacheBust({
			basePath: './public/',
		}))
		.pipe(gulpHtmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest('./public'));
}

function copyStaticAssetsTask() {
	return gulp.src('./src/images/**/*')
		.pipe(gulp.dest('./public/images/'));
}

function bundleTask() {
	return gulp.src('./src/index.js')
		.pipe(gulpWebpack(webpackConfig, webpack2))
		.pipe(gulp.dest('public'));
}

function buildWatch() {
	return gulp.watch('./src/**/*', ['build']);
}

gulp.task('bundle', bundleTask);
gulp.task('bundle:watch', buildWatch);
gulp.task('html', generateHtmlTask);
gulp.task('copy', copyStaticAssetsTask);
gulp.task('build', (cb) => {
	gulpSquence('bundle', ['html', 'copy'])(cb);
});
gulp.task('build:dev', ['build', 'bundle:watch']);
