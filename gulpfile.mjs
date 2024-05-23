import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import replace from 'gulp-replace';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import lightningcss from 'gulp-lightningcss';
import gulpHeaderComment from 'gulp-header-comment';

const sass = gulpSass(dartSass);
const destDir = 'public';
const headerComment = `
  Generated on <%= moment().format('YYYY-MM-DDTHH:MM:SSZ') %>
  Author: <%= pkg.author %>
`

function cleanDist() {
  return gulp.src(destDir, {allowEmpty: true})
    .pipe(clean())
}

function compileScss() {
  return gulp
    .src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(lightningcss({minify: false}))
    .pipe(gulpHeaderComment(headerComment))
    .pipe(gulp.dest(destDir))
    .pipe(lightningcss({minify: true}))
    .pipe(gulpHeaderComment(headerComment))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(destDir));
}

function processHtml() {
  return gulp
    .src('public/**/*.html')
    .pipe(replace(/(styles.css|scripts.js)/g, function handleReplace(match) {
      const parts = match.split('.');
      return `${parts[0]}.min.${parts[1]}`;
    }))
    .pipe(gulpHeaderComment(headerComment))
    .pipe(gulp.dest(destDir));
}

function transpileMjs() {
  return gulp
    .src('src/scripts/**.mjs')
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-syntax-import-attributes'],
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulpHeaderComment(headerComment))
    .pipe(gulp.dest(destDir))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulpHeaderComment(headerComment))
    .pipe(gulp.dest(destDir));
}

export const prepare = gulp.series(
  cleanDist,
);

export const prepareResources = gulp.series(
  compileScss,
  transpileMjs,
)

export const build = gulp.series(
  processHtml,
  prepareResources,
);

export const watchJs = gulp.series(
  function watchJsSeries() {
    return gulp.watch(
      'src/scripts/**.mjs',
      gulp.series(transpileMjs)
    )
  },
);

export const watchScss = gulp.series(
  function watchScssSeries() {
    return gulp.watch(
      'src/scss/**/*.scss',
      gulp.series(compileScss)
    )
  },
);

export const watch = gulp.series(
  prepareResources,
  gulp.parallel(
    watchJs,
    watchScss,
  ),
);