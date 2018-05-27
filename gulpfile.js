var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass');

gulp.task('sass', function () {
	
	return gulp.src('src/css/**/*.scss')
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('src/css'));
	
});

gulp.task('server', function() {
	
	browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
	
	gulp.watch("src/css/**/*", ['sass']);
	gulp.watch("src/**/*").on('change', browserSync.reload);
	
});