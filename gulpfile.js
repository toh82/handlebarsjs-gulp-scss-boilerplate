var gulp = require('gulp')

gulp.task('hbs', function () {
  var handlebars = require('gulp-compile-handlebars')
  var pageConfig = require('./src/base-data.json')

  var options = {
    ignorePartials: true,
    batch: ['./src/partials']
  }

  return gulp.src('./src/**/*.html')
    .pipe(handlebars(pageConfig, options))
    .pipe(gulp.dest('web'))
})

gulp.task('js', function () {
  var uglify = require('gulp-uglify')

  var jsSrc = [
    'src/js/*.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/aos/dist/aos.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
  ]

  return gulp.src(jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest('web/assets/js'))
})

gulp.task('css', function () {
  var sourcemaps = require('gulp-sourcemaps')
  var sass = require('gulp-sass')

  var cssSrc = [
    './node_modules/font-awesome/scss/font-awesome.scss',
    './node_modules/aos/src/sass/aos.scss',
    './src/scss/styles.scss'
  ]

  var sassOptions = {
    outputStyle: 'compressed'
  }

  return gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/assets/css'))
})

gulp.task('copy', function(){
  var implodePath = require('./lib/implode-path')

  var fontPaths = [
    implodePath(['node_modules', 'bootstrap', 'fonts', '*']),
    implodePath(['node_modules', 'font-awesome', 'fonts', '*']),
  ]

  return gulp.src(fontPaths)
    .pipe(gulp.dest(implodePath(['web', 'assets', 'fonts'])));
});

gulp.task('init', ['hbs', 'css', 'js', 'copy'])
gulp.task('default', ['hbs', 'css', 'js'])
gulp.task('watch', function () {
  return gulp.watch('./src/*', ['hbs', 'css', 'js'])
})
