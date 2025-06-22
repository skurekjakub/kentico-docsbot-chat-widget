/**
 * Supported Packages
 *
 * List here all dependencies necessary to run required tasks.
 */
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

/**
 * Paths & Files
 */
const fileName = 'docsbot-ai';

const srcInput = {};
srcInput.css = './src/assets/scss/';

const srcOutput = {};
srcOutput.css = './src/assets/css/';

/**
 * List of Supported Browsers
 */
const browsersList = ['last 2 version', '> 1%'];

/**
 * 📦 Build CSS
 *
 * - Linter issues
 * - Concat files into one
 * - Minify concated file
 */
gulp.task('styles', function () {
  return (
    gulp
      .src(srcInput.css + '**/*.scss')
      // Check if files have an error
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(autoprefixer(browsersList))
      .pipe(gulp.dest(srcOutput.css))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(srcOutput.css))
      .on('finish', function () {
        console.log('📦 Finished compiling styles.');
      })
  );
});

/**
 * 🔥 Clean-up CSS
 *
 * Removes all compiled CSS files in order to avoid conflicts.
 */
gulp.task('clean', async function () {
  const del = await import('del');
  console.log('🧹 Deleting files in:', srcOutput.css + '*');
  const deletedPaths = await del.deleteAsync([srcOutput.css + '*']);
  console.log('✅ Deleted:', deletedPaths);
});

/**
 * 🧑🏻‍💻 Watch Changes
 *
 * Task written for development mode.
 */
gulp.task('watch', function () {
  gulp.watch(srcInput.css + '**/**/**/*.scss', gulp.series(['styles']));
});

/**
 * 📦 Build
 *
 * Task written for production mode.
 */
gulp.task('build', gulp.series(['clean', 'styles']));
