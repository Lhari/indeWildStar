var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	changed = require('gulp-changed'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	unzip = require('gulp-unzip'),
	rimraf = require('gulp-rimraf'),
	glob = require('glob'),
	clean = require('gulp-rimraf'),
	ext = require('gulp-ext-replace');
 
var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;


function startExpress() {
 
var express = require('express');
	var app = express();
	app.use(require('connect-livereload')());
	app.use(express.static(EXPRESS_ROOT));
	app.listen(EXPRESS_PORT);
}

var lr;
function startLivereload() {
 
	lr = require('tiny-lr')();
	lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event) {

	 gulp.src(event.path, {read: false})
	.pipe(require('gulp-livereload')(lr));

}

var fontsToMove = [
	'.tmp/**/*.svg',
	'.tmp/**/*.eot',
	'.tmp/**/*.ttf',
	'.tmp/**/*.woff'
]
var cssToMove = [
	'.tmp/**/fontello.css'
]
gulp.task('dependencies',function() {
	gulp.src('dependencies/*.zip')
	.pipe(changed('dependencies/**'))
	.pipe(unzip())
	.pipe(gulp.dest('./tmp'))

	files = glob.sync('tmp/**/*.{ttf,woff,eot,svg}');
  	gulp.src(files)
  	.pipe(gulp.dest('font'))

  	file = glob.sync('tmp/**/fontello.css');
  	gulp.src(file)
  	.pipe(ext('.scss'))
  	.pipe(gulp.dest('sass'))
})

gulp.task('clean-up', function() {
	return gulp.src('dependencies/**/*.zip', {read: false})
  	.pipe(clean())


})
gulp.task('clean-up-tmp', function() {
	 return gulp.src('tmp', {read: false})
  	.pipe(clean())
})

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
	.pipe(changed('sass/**'))
	.pipe(sass({ style:'expanded'}) )
	.pipe(prefix())
	.pipe(gulp.dest('stylesheets'))
	.pipe(minifyCSS({keepBreaks:false}))
	.pipe(rename('min.main.css'))
	.pipe(gulp.dest('stylesheets'))
});

gulp.task('js-top', function() {
	gulp.src([
		'bower_components/jquery/jquery.js',
		'bower_components/modernizr/modernizr.js',
		'js/partials/*.js'
		])
	.pipe(changed('js/**'))
	.pipe(concat('app.top.js'))
	.pipe(gulp.dest('js'))
	.pipe(uglify())
	.pipe(concat('app.top.min.js'))
	.pipe(gulp.dest('js'))
})
gulp.task('js-bottom', function() {

})
gulp.task('watch', function() {
	startExpress();
	startLivereload();

	gulp.watch('dependencies/*.zip', ['dependencies']);
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/partials/*.js', ['js-top']);
	gulp.watch('js/partials/*.js', ['js-bottom']);
	gulp.watch('dependencies/*.zip', ['clean-up']);
	gulp.watch('dependencies/*.zip', ['clean-up-tmp']);

	gulp.watch('dependencies/*.zip', notifyLivereload);
	gulp.watch('sass/**/*.scss', notifyLivereload);
	gulp.watch('js/partials/*.js', notifyLivereload);
	gulp.watch('js/partials/*.js', notifyLivereload);
	gulp.watch('dependencies/*.zip', notifyLivereload);
	gulp.watch('dependencies/*.zip', notifyLivereload);

});