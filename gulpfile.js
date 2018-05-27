var gulp = require('gulp'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	htmlmin = require('gulp-htmlmin'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify');

// compila o .SCSS
gulp.task('sass', function () {
	
	return gulp.src('src/css/**/*.scss')
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('src/css'));
	
});

// Servidor Local
gulp.task('server', function() {
	
	browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
	
	gulp.watch("src/css/**/*", ['sass']);
	gulp.watch("src/**/*").on('change', browserSync.reload);
	
});

// Limpa a pasta DIST/
gulp.task('reset', function () {
  return del(['dist/**/*']);
});

// Copia os arquidos de SRC/ para DIST/
gulp.task('copy', function() {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

// Minifica o HTML
gulp.task('html', function () {
	
	return gulp.src('src/*.html')
    .pipe(htmlmin({
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		}))
    .pipe(gulp.dest('dist'));
	
});

// Minifica o CSS
gulp.task('css', function () {
	
    return gulp.src('src/**/*.css')
	.pipe(cssmin())
	.pipe(gulp.dest('dist'));
});

// Minifica o JS
gulp.task('js', function () {
	
	return gulp.src('src/**/*.js')
    .pipe(uglify())
	.pipe(gulp.dest('dist'));
});

// Gera a versão final do projeto
gulp.task('build', ['reset', 'copy', 'html', 'css', 'js'], function() {});