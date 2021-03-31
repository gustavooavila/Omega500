/*! gulpfile.js */

const gulp = require("gulp");

const browserify = require("browserify");
const babelify = require("babelify");

const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");

const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");

function buildJS(){
    const b = browserify({
        entries: "./Ω/index.js",
        debug: true,
    });

    return b
    .transform(babelify)
    .bundle()
    .pipe(source("omega500.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    //.on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/"));
};

function build(){
    return gulp.src([
        "vendor/jquery-3.1.0.min.js",
         "./Ω/index.js",
    ])
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"));
};

exports.default = gulp.series(buildJS);