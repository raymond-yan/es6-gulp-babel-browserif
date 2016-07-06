# Introduction:

ES6 has not been widely supported by browsers yet. So as to use the new features in es6 such as generator, arrow function, destructuring we need to compile the es6 file to es5 with babel.

# Usage:

`npm install`

`gulp`

# Explanation:

For the basic usage like arrow function, destructuring: 

First we need to install pacages:

`npm install --save-dev gulp-babel gulp babel-preset-es2015`

Then we need to creat gulpfile.js:

##Gulp files:


``` javascript
const babel = require('gulp-babel');
const gulp = require('gulp');

gulp.task("transform",() => {
	return gulp.src("es6.js") 
	.pipe( babel({
		presets: ['es2015']
	}) ) // babel transofrm with es 2015.
	.on("error", error => {
		console.log( error );
	})
	.pipe( gulp.dest('dist') );
});
```
Then run:
`gulp transform`
<br>
It will auto transform some basic features in es6 but for more features like `generator`, `promise` we need the babel-runtime:
`npm install --save babel-runtime`
`npm install --save-dev babel-plugin-transform-runtime babel-preset-es2015 babelify browserify gulp vinyl-source-stream `

gulpfiles.js:

```javascript
const gulp = require('gulp');
const browserify = require( 'browserify' );
const source = require( 'vinyl-source-stream' );

gulp.task( 'transform-runtime', () =>{
	return browserify({
		entries:"es6.js",
		debug:true
	})
	// babel-plugin-transform-runtime transfer the function to transfer es6 to es5 to be in "require()" then browserify will look it up from 
	// babel-runtime plugins. Without the setting, it will transfer some es6 to executable functions locally and some other just remain there 
	// like generator 
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
```

