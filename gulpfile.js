var gulp = require ('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    pathModule = './node_modules',
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    postcss = require('gulp-postcss'),
    sprites = require('postcss-sprites'),
    easyMediaQuery = require('postcss-easy-media-query'),
    vars   = require('postcss-simple-vars'),
    browserSync  = require('browser-sync').create(),
    reload = browserSync.reload;
var pathes = {
    build: {
        css: './dist/css'
    }
};

gulp.task('htmlReload', function () {
  return gulp.src('*.html')
    .pipe(reload({stream: true}));
});

gulp.task('phpReload', function () {
  return gulp.src('*.php')
    .pipe(reload({stream: true}));
});

// gulp.task('javascript', function () {
//   return gulp.src('./src/javascript/main.js')
//     .pipe(reload({stream: true}));
// });

gulp.task('browser-sync', function() {
  browserSync.init({
      server: './',
      //proxy: "optimized.dev" 
      //tunnel: "binaryuno"
  })  
});

// gulp.task('vendorScripts', function() {
//   gulp.src([
//     `${pathModule}/jquery/dist/jquery.min.js`,
//      `./src/javascript/main.js`
//     ])
//     .pipe(concat('vendor.js'))
//     .pipe(gulp.dest(pathes.build.js));
// });

gulp.task('less', function () {

  return gulp.src('./src/stylesheets/main.less')
    .pipe(plumber(function () {
        console.log('===========');
        console.log('ERROR LESS');
        console.log('===========');
        this.emit('end');
    }))
    //.pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('style.css'))
    //.pipe(cssmin())
    //.pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ["> 40%"] }))
    .pipe(gulp.dest(pathes.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('copyfonts', function() {
   gulp.src('./src/fonts/**/*.{ttf,woff,woff2,eof,svg}')
   .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', ['less', 'browser-sync'],  function() {
  gulp.watch('./src/stylesheets/**/*.less', ['less']);
  gulp.watch('./*.html', ['htmlReload']);
  gulp.watch('./*.php', ['phpReload']);
});



gulp.task('default', ['watch', 'browser-sync', 'less', 'htmlReload', 'phpReload']);



// gulp.task('watch', function () {
//   gulp.watch('./src/stylesheets/**/*.less', ['styles']);
//   gulp.watch('*.html').on('change', reload({stream: true}));
//   gulp.watch('*.php').on('change', reload({stream: true}));
// });

// gulp.task('default', ['browser-sync', 'watch']);