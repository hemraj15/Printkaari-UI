var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync'),
autoprefixer = require('autoprefixer'),
postcss = require('gulp-postcss'),
cssVars = require('postcss-simple-vars'),
mixins = require('postcss-mixins'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
rename = require('gulp-rename');


gulp.task('default', function(){
	browserSync.init({
		server : {
			basseDir: "./"
		}
	});

	watch('./js/**/*.js',function(){
		browserSync.reload();
	});

	watch('./**/*.html',function(){
		browserSync.reload();
	});

	watch('./src/styles/td/**/*.css', function(){
		gulp.start('cssInject');
	});
});

gulp.task('cssInject',['td-style'], function(){
	gulp.src('./dest/styles/td-style.css')
		.pipe(browserSync.stream());
});

gulp.task('td-style', function(){
	return gulp.src('./src/styles/td/style.css')
		.pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))
		.on('error', function(errInfo){
	    	console.log(errInfo);
	    	this.emit('end');
	    })
	    .pipe(rename('td-style.css'))
	    .pipe(gulp.dest('./dest/styles/'));
});
