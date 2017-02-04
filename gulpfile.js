var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync');


gulp.task('default', function(){
	browserSync.init({
		server : {
			basseDir: "./"
		}
	});

	watch('./**/*.js',function(){
		browserSync.reload();
	});

	watch('./**/*.html',function(){
		browserSync.reload();
	});
});