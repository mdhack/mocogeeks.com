const gulp = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const pump = require("pump");

// Change to another module with ES6 support
const composer = require("gulp-uglify/composer");
const uglify = composer(require("uglify-es"), console);

const CSS_PATHS = [
    "assets/css/**/*.css"
];

const JS_PATHS = [
    "node_modules/fuse.js/dist/fuse.js",
    "node_modules/geolib/dist/geolib.js",
    "node_modules/jquery/dist/jquery.js",
    "assets/js/**/*.js"
];

gulp.task("default", ["watch"]);

gulp.task("build", ["build-css", "build-js"]);

gulp.task('build-css', function () {	
	return gulp.src(CSS_PATHS)
		.pipe(concat('mdhack.min.css'))
		.pipe(gulp.dest('assets/dist/'));
});

gulp.task("build-js", cb => {
    pump([
        gulp.src(JS_PATHS),
        uglify(),
        concat("mdhack.min.js"),
        gulp.dest("assets/dist/")
    ], cb);
});

gulp.task("watch", ["watch-css", "watch-js"]);

gulp.task("watch-css", () => gulp.watch(CSS_PATHS, ["build-css"]));

gulp.task("watch-js", () => gulp.watch(JS_PATHS, ["build-js"]));