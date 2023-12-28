import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import htmlMin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

const destDir = 'public';

function cleanDist() {
    return gulp.src(destDir, {allowEmpty: true})
        .pipe(clean())
}

function minifyCss() {
    return gulp
        .src('src/styles.css')
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

function transpileJs() {
    return gulp
        .src('src/script.js')
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest(destDir));
}

export const build = gulp.series(
    cleanDist,
    minifyCss,
    copyIndex,
    transpileJs,
);