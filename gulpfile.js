const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss"),
  merge = require("merge-stream"),
  gulp = require("gulp"),
  babel = require("gulp-babel"),
  babelify = require("babelify"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer");

// Default Gulp Task
exports.default = series(scssTask, jsTask, watchTask);

// Sass Task
function scssTask() {
  var scss_master = gulp
    .src("static/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }))
    .pipe(postcss([autoprefixer({ grid: "autoplace" }), cssnano()]))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./"));

  return merge(scss_master);
}

// Sass Interactive Styles task

//JS Task
function jsTask() {
  var js_master = browserify(["static/js/scripts.js"])
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
      })
    )
    .bundle()
    .pipe(source("scripts.js"))
    .pipe(gulp.dest("./dist/js"));

  return merge(js_master);
}

// Watch Task
function watchTask() {
  watch(
    [
      "./static/**/*.scss",
      "./static/*.scss",
      "./*.php",
      "./*.html",
      "./static/js/*.js",
    ],
    series(scssTask, jsTask)
  );
}
