var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var paths = {
  css: ["node_modules/bootstrao/scss/bootstrap.scss", "src/scss/*.scss"],
  script: [
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/popper.js/dist/umd/popper.min.js"
  ]
};

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task("js", function() {
  return gulp
    .src(paths.script)
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(paths.css, ["sass"]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["js", "serve"]);
