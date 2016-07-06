const babel = require('gulp-babel');
const gulp = require('gulp');
const browserify = require( 'browserify' );
const source = require( 'vinyl-source-stream' );

gulp.task("transform",() => {
	return gulp.src("es6.js")
	.pipe( babel({
		presets: ['es2015']
	}) )
	.on("error", error => {
		console.log( error );
	})
	.pipe( gulp.dest('dist') );
});

gulp.task( 'transform-runtime', () =>{
	return browserify({
		entries:"es6.js",
		debug:true
	})
	.transform( "babelify", { presets:["es2015"], plugins: ["transform-runtime"] } )
	.bundle()
	.on( "error", error => {
		console.log( "[Bundle Error] " + error );
	})
	.pipe( source('es6.js') )
	.pipe( gulp.dest('dist') );
});

gulp.task( "watch", () => {
	return gulp.watch( "*.js", ["transform-runtime"] )
});

gulp.task( 'default', ['transform-runtime', 'watch'] );