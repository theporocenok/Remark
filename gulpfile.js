const
    gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant')
    autoprefixer= require('gulp-autoprefixer');
    
const dist = './dist';

function sassToCss(){
  return gulp.src('app/sass/**/*.sass')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(autoprefixer(['last 15 versions'], {cascade: true}))
      .pipe(gulp.dest(`${dist}/css`))
      .pipe(browserSync.stream())
}

function scripts(){
  return gulp.src([
    'app/libs/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(gulp.dest(`${dist}/js`));
}

function img(){
  return gulp.src('app/img/originals/**/*')
    .pipe(imagemin({
      interpaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      une: [pngquant()]
    }))
    .pipe(gulp.dest(`${dist}/img`))
    .pipe(browserSync.stream());
}

function html(){
  return gulp.src([
    'app/*.html'
    ])
    .pipe(gulp.dest(`${dist}`));
}

function js(){
  return gulp.src([
    'app/js/**/*.js'
    ])
    .pipe(gulp.dest(`${dist}/js`));
}

function watch(){
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  });

  gulp.watch(['app/sass/**/*.sass'], sassToCss);
  gulp.watch(['app/img/originals/**/*'], img);
  gulp.watch(['app/*.html'], html);
  gulp.watch(['app/js/**/*.js'], js);
  gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('dist/**/*.html', browserSync.reload);
}

exports.watch = watch;

function browser_sync(){
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
}

gulp.task('default', gulp.series(gulp.parallel(sassToCss, scripts, img), watch));