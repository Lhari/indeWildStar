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
	glob = require('glob'),
	clean = require('gulp-rimraf'),
	ext = require('gulp-ext-replace');
 

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
  	.pipe(rename('_fontello.css'))
  	.pipe(ext('.scss'))
  	.pipe(gulp.dest('sass/general/'))
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
	.pipe(concat('all.top.js'))
	.pipe(gulp.dest('js'))
	.pipe(uglify())
	.pipe(concat('all.top.min.js'))
	.pipe(gulp.dest('js'))
})
gulp.task('js-bottom', function() {

})
gulp.task('watch', function() {
	
	gulp.watch('dependencies/*.zip', ['dependencies']);
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/partials/*.js', ['js-top']);
	gulp.watch('js/partials/*.js', ['js-bottom']);
	gulp.watch('dependencies/*.zip', ['clean-up']);
	gulp.watch('dependencies/*.zip', ['clean-up-tmp']);

});
