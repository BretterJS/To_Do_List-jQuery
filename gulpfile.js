let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let eslint = require('gulp-eslint');
let browserSync = require('browser-sync').create();

gulp.task('lint', () => {
    return gulp.src(['./*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

let sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', () => {
    gulp.src('src/*scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('./src'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  gulp.src('./src/*.html')
  .pipe(gulp.dest('dist/html'))
  .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch("./src/*scss", ['sass']);
    gulp.watch("./src/*.html", ['html']).on('change', browserSync.reload);
    gulp.watch("./src/*.js").on('change', browserSync.reload);
});

gulp.task('images', () => {
    gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});


  gulp.task('default', ['lint', 'sass', 'html', 'images', 'serve']);
