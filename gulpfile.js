import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import browser from 'browser-sync';
import terser from 'gulp-terser';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';

// Styles
export const styles = () => {
    return gulp.src('source/sass/style.scss', {sourcemaps: true})
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(), 
            csso()]))
        .pipe(rename('style.min.css'))    
        .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
        .pipe(browser.stream())
};

// HTML
export const html = () => {
    return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}

// Scripts
export const scripts = () => {
    return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(rename('main.min.js')) 
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream())
}

// Images
export const optimizeImages = () => {
    return gulp.src('source/images/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/images'))
}

export const copyImages = () => {
    return gulp.src('source/images/**/*.{jpg,png}')
    .pipe(gulp.dest('build/images'))
}

// WebP
export const createWebp = () => {
    return gulp.src('source/images/**/*.{jpg,png}')
    .pipe(squoosh({webp: {}}))
    .pipe(gulp.dest('build/images'))
}

// SVG 
export const svg = () => {
    return gulp.src(['source/images/*.svg', '!source/images/icons'])
    .pipe(svgo())
    .pipe(gulp.dest('build/images'))
}

// export const sprite = () => {
//     return gulp.src('source/images/icons')
//     .pipe(svgo())
//     .pipe(svgstore({inlineSvg: true}))
//     .pipe(rename('sprite.svg'))
//     .pipe(gulp.dest('build/images'))
// }

// Fonts
export const fonts = (done) => {
  return gulp.src('source/fonts/*.{woff,woff2}')
  .pipe(gulp.dest('build/fonts'))
  done();
}

// Copy
export const copy = (done) => {
    return gulp.src(['source/*.ico', 'source/*.webmanifest'])
    .pipe(gulp.dest('build'))
    done();
}

// Clean 
export const clean = () => {
    return del('build');
}

// Server

export const server = (done) => {
    browser.init({
      server: {
        baseDir: 'build/'
      },
      cors: true,
      notify: false,
      ui: false,
    });
    done();
}

// Reload
const reload = (done) => {
    browser.reload();
    done();
}

// Watcher
export const watcher = () => {
    gulp.watch('source/sass/**/*.scss', gulp.series(styles));
    gulp.watch('source/js/script.js', gulp.series(scripts));
    gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
    clean,
    copy,
    fonts,
    optimizeImages,
    gulp.parallel (
      styles,
      html,
      scripts,
      svg,
    //   sprite,
      createWebp
    )
  );

  // Default
  export default gulp.series(
    clean,
    copy,
    fonts,
    copyImages,
    gulp.parallel (
      styles,
      html,
      scripts,
      svg,
    //   sprite,
      createWebp
      ),
      gulp.series(
      server,
      watcher
    )
  );