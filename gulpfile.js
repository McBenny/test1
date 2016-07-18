/*


            GGGGGGGGGGGGG                  lllllll                       ffffffffffffffff    iiii  lllllll
         GGG::::::::::::G                  l:::::l                      f::::::::::::::::f  i::::i l:::::l
       GG:::::::::::::::G                  l:::::l                     f::::::::::::::::::f  iiii  l:::::l
      G:::::GGGGGGGG::::G                  l:::::l                     f::::::fffffff:::::f        l:::::l
     G:::::G       GGGGGGuuuuuu    uuuuuu   l::::lppppp   ppppppppp    f:::::f       ffffffiiiiiii  l::::l     eeeeeeeeeeee
    G:::::G              u::::u    u::::u   l::::lp::::ppp:::::::::p   f:::::f             i:::::i  l::::l   ee::::::::::::ee
    G:::::G              u::::u    u::::u   l::::lp:::::::::::::::::p f:::::::ffffff        i::::i  l::::l  e::::::eeeee:::::ee
    G:::::G    GGGGGGGGGGu::::u    u::::u   l::::lpp::::::ppppp::::::pf::::::::::::f        i::::i  l::::l e::::::e     e:::::e
    G:::::G    G::::::::Gu::::u    u::::u   l::::l p:::::p     p:::::pf::::::::::::f        i::::i  l::::l e:::::::eeeee::::::e
    G:::::G    GGGGG::::Gu::::u    u::::u   l::::l p:::::p     p:::::pf:::::::ffffff        i::::i  l::::l e:::::::::::::::::e
    G:::::G        G::::Gu::::u    u::::u   l::::l p:::::p     p:::::p f:::::f              i::::i  l::::l e::::::eeeeeeeeeee
     G:::::G       G::::Gu:::::uuuu:::::u   l::::l p:::::p    p::::::p f:::::f              i::::i  l::::l e:::::::e
      G:::::GGGGGGGG::::Gu:::::::::::::::uul::::::lp:::::ppppp:::::::pf:::::::f            i::::::il::::::le::::::::e
       GG:::::::::::::::G u:::::::::::::::ul::::::lp::::::::::::::::p f:::::::f            i::::::il::::::l e::::::::eeeeeeee
         GGG::::::GGG:::G  uu::::::::uu:::ul::::::lp::::::::::::::pp  f:::::::f            i::::::il::::::l  ee:::::::::::::e
            GGGGGG   GGGG    uuuuuuuu  uuuullllllllp::::::pppppppp    fffffffff            iiiiiiiillllllll    eeeeeeeeeeeeee
                                                   p:::::p
                                                   p:::::p
                                                  p:::::::p
                                                  p:::::::p
                                                  p:::::::p
                                                  ppppppppp

*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump');



/*
    .dP"Y8    db    .dP"Y8 .dP"Y8     888888    db    .dP"Y8 88  dP .dP"Y8
    `Ybo."   dPYb   `Ybo." `Ybo."       88     dPYb   `Ybo." 88odP  `Ybo."
    o.`Y8b  dP__Yb  o.`Y8b o.`Y8b       88    dP__Yb  o.`Y8b 88"Yb  o.`Y8b
    8bodP' dP""""Yb 8bodP' 8bodP'       88   dP""""Yb 8bodP' 88  Yb 8bodP'
*/
gulp.task('sass:compile', function () {
    return gulp.src(['./app/scss/**/*.scss', './app/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:minify', ['sass:compile'], function () {
    return gulp.src(['./public/css/*.css', '!./public/css/*.min.css'])
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass', function () {
    gulp.watch(['./app/scss/*.scss', './app/scss/**/*.scss'], ['sass:compile']);
    console.log('       Sass watch running...');
    console.log('       Ctrl + C to stop.');
});

gulp.task('sass:prod', ['sass:minify'], function () {});



/*
     88888 .dP"Y8     888888    db    .dP"Y8 88  dP .dP"Y8
        88 `Ybo."       88     dPYb   `Ybo." 88odP  `Ybo."
    o.  88 o.`Y8b       88    dP__Yb  o.`Y8b 88"Yb  o.`Y8b
    "bodP' 8bodP'       88   dP""""Yb 8bodP' 88  Yb 8bodP'
*/
gulp.task('js:vendors', function () {
    return gulp.src(['./bower_components/jquery/dist/jquery.js', './vendor/scripts/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('vendors.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('js:compile', function () {
    return gulp.src(
            [
                './app/scripts/functionals/base.js',
                './app/scripts/functionals/helpers.js',
                './app/scripts/functionals/functions.js',
                './app/scripts/general.js',
                './app/scripts/appart.js'
            ]
        )
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/scripts'));
});
gulp.task('js:uglify', ['js:vendors', 'js:compile'], function (cb) {
    pump(
        [
            gulp.src(['./public/scripts/*.js', '!./public/scripts/*.min.js']),
            rename({
                suffix: '.min'
            }),
            uglify(),
            gulp.dest('./public/scripts')
        ], cb
    );
});

gulp.task('js', function () {
    gulp.watch(['./app/scripts/*.js'], ['js:vendors', 'js:compile']);
    console.log('       Js watch running...');
    console.log('       Ctrl + C to stop.');
});
gulp.task('js:prod', ['js:uglify'], function () {});





/*
    8b    d8    db    88 88b 88     888888    db    .dP"Y8 88  dP .dP"Y8
    88b  d88   dPYb   88 88Yb88       88     dPYb   `Ybo." 88odP  `Ybo."
    88YbdP88  dP__Yb  88 88 Y88       88    dP__Yb  o.`Y8b 88"Yb  o.`Y8b
    88 YY 88 dP""""Yb 88 88  Y8       88   dP""""Yb 8bodP' 88  Yb 8bodP'
*/
gulp.task('prod', ['js:prod', 'sass:prod'], function () {
    console.log('Default task running for production...');
    console.log('    - Compiling Sass to CSS with minification,');
    console.log('    - Concatenating Javascripts and minifying.');
});

gulp.task('default', ['js', 'sass'], function () {
    console.log('Default task running...');
    console.log('    - Sass watching,');
    console.log('    - Javascript watching');
});