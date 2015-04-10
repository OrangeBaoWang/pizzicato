var gulp = require('gulp');
var include = require('gulp-include');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('karma').server;

gulp.task('hint', function() {
	gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('scripts', function() {
	gulp.src('./src/Pizzicato.js')
		.pipe(include())
		.pipe(gulp.dest('./distr'))
		.pipe(rename('Pizzicato.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./distr'))	
});

gulp.task('test', function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
})

gulp.task('default', ['hint', 'scripts', 'test']);