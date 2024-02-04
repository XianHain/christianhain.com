import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import htmlMin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import cleanCss from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';


const sass = gulpSass(dartSass);
const destDir = 'public';

function cleanDist() {
  return gulp.src(destDir, {allowEmpty: true})
    .pipe(clean())
}

function compileScss() {
  return gulp
    .src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCss())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(destDir));
}

function copyIndex() {
  return gulp
    .src('src/index.html')
    .pipe(replace(/(styles.css|script.js)/g, function handleReplace(match) {
      const parts = match.split('.');
      return `${parts[0]}.min.${parts[1]}`;
    }))
    .pipe(htmlMin({
      minifyJS: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(destDir));
}

function transpileMjs() {
  return gulp
    .src('src/scripts/**.mjs')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('src'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest(destDir));
}

export const build = gulp.series(
  cleanDist,
  copyIndex,
  compileScss,
  transpileMjs,
);

export const watchJs = gulp.series(
  function watchJsSeries() {
    return gulp.watch(
      'src/scripts/**.mjs',
      gulp.series(transpileMjs)
    )
  },
)