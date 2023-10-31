let gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  sourcemaps = require('gulp-sourcemaps'),
  $ = require('gulp-load-plugins')(),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cached = require('gulp-cached'),
  dependents = require('gulp-dependents'),
  browserSync = require('browser-sync').create(),
  debug = require('gulp-debug');


function styles() {
  return gulp.src('scss/**/*.scss')
    .pipe(cached('sass'))
    .pipe(dependents())
    .pipe(debug({ title: 'scss:' }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      // includePaths: [
      //   './node_modules/bootstrap/scss',
      //   '../../contrib/bootstrap_barrio/scss',
      // ],
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({ dirname: '' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    //### generate minimal
    /* .pipe(cleanCss())
    .pipe(rename({ dirname: '', suffix: '.min' }))
    .pipe(gulp.dest('css')) */
    //### debug
    .pipe(debug({ title: 'css:' }))
    .pipe(browserSync.stream())

}

/* function js() {
  return gulp.src('./js')
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream())
} */

function serve() {
  browserSync.init({
    open: false,
    notify: false,
    proxy: {
      target: 'http://nginx'
    },
    files: './css/*.css, ./templates/**/*.twig, ./js/*.js',
    watchOptions: {
      ignoreInitial: true
    },
  })

  gulp.watch('./scss/**/*.scss', styles).on('change', browserSync.stream)
}

const stylesync = gulp.series(styles, serve)

exports.styles = styles

exports.serve = serve
exports.stylesync = stylesync

gulp.task('default', gulp.series(styles, serve));

