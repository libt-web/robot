
var target = '../src/';

var gulp 		= require('gulp');
var uglify 		= require('gulp-uglify');
var minifyCss 	= require('gulp-minify-css');
var less 		= require('gulp-less');
var concat 		= require('gulp-concat');
var rename 		= require('gulp-rename');
var minfyHtml 	= require('gulp-minify-html');
var sprite 		= require('gulp.spritesmith');
var imagemin 	= require('gulp-imagemin');
var pngquant 	= require('imagemin-pngquant');

gulp.task('tpl', function() {
	gulp.src(target+'tpl/idc/*.html')
		.pipe(minfyHtml())
		.pipe(gulp.dest(target+'tpl/dist/idc'))
});

gulp.task('sprite', function() {
	gulp.src(target+'style/sprite_src/*.png')
		.pipe(sprite({
			imgName: 'sprite.png',
			cssName: 'sprite.css'
		}))
        .pipe(gulp.dest(target+'style/sprite'));
});

gulp.task('img', function() {
	gulp.src(target+'style/sprite/*.png')
		.pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(target+'style/sprite/img'));
});

gulp.task('less', function(){
	gulp.src(target+'style/less/*.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(rename({ extname:'.min.css' }))
		.pipe(gulp.dest(target+'style/css'))
});

gulp.task('script', function(){
	gulp.src(target+'js/src/idc/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(target+'js/dist/idc'))
});

gulp.task('auto', function(){
	gulp.watch(target+'tpl/idc/*.html', ['tpl']);
	gulp.watch(target+'style/sprite_src/*.png', ['sprite']);
	gulp.watch(target+'style/less/*.less', ['less']);
	gulp.watch(target+'js/src/idc/*.js', ['script']);
});

//直接gulp，执行默认任务
gulp.task('default', ['tpl', 'sprite', 'less', 'script', 'auto']);
