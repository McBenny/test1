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
        /* 
            888888    db    88""Yb 88     888888      dP"Yb  888888      dP""b8  dP"Yb  88b 88 888888 888888 88b 88 888888 
              88     dPYb   88__dP 88     88__       dP   Yb 88__       dP   `" dP   Yb 88Yb88   88   88__   88Yb88   88   
              88    dP__Yb  88""Yb 88  .o 88""       Yb   dP 88""       Yb      Yb   dP 88 Y88   88   88""   88 Y88   88   
              88   dP""""Yb 88oodP 88ood8 888888      YbodP  88          YboodP  YbodP  88  Y8   88   888888 88  Y8   88   
         */
/**
 *      - Variables             FIND_VARS
 *      - Assets                FIND_ASSETS 
 *      - Javascript            FIND_JS
 *      - Sass                  FIND_SASS
 *      - Main tasks            FIND_MAIN
 */





//  FIND_VARS
/*
    Yb    dP    db    88""Yb 88    db    88""Yb 88     888888 .dP"Y8
     Yb  dP    dPYb   88__dP 88   dPYb   88__dP 88     88__   `Ybo."
      YbdP    dP__Yb  88"Yb  88  dP__Yb  88""Yb 88  .o 88""   o.`Y8b
       YP    dP""""Yb 88  Yb 88 dP""""Yb 88oodP 88ood8 888888 8bodP'
*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    livereload = require('gulp-livereload');





//  FIND_ASSETS
/*
       db    .dP"Y8 .dP"Y8 888888 888888 .dP"Y8
      dPYb   `Ybo." `Ybo." 88__     88   `Ybo."
     dP__Yb  o.`Y8b o.`Y8b 88""     88   o.`Y8b
    dP""""Yb 8bodP' 8bodP' 888888   88   8bodP'
*/
gulp.task('assets:copy', function () {
    return gulp.src(['./app/assets/**/*'])
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});
gulp.task('assets', function () {
    gulp.watch(['app/assets/**/*'], ['assets:copy']);
    console.log('       Assets watch running...');
    console.log('       Ctrl + C to stop.');
});





//  FIND_JS
/*
     88888 .dP"Y8     888888    db    .dP"Y8 88  dP .dP"Y8
        88 `Ybo."       88     dPYb   `Ybo." 88odP  `Ybo."
    o.  88 o.`Y8b       88    dP__Yb  o.`Y8b 88"Yb  o.`Y8b
    "bodP' 8bodP'       88   dP""""Yb 8bodP' 88  Yb 8bodP'
*/
gulp.task('js:vendors', function () {
    return gulp.src(['bower_components/jquery/dist/jquery.js', './vendor/scripts/*.js'])
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
                './app/scripts/**/*.js'
            ]
        )
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/scripts'))
        .pipe(livereload());
});
gulp.task('js:uglify', ['js:vendors', 'js:compile'], function (cb) {
    pump(
        [
            gulp.src(['./public/scripts/**/*.js', '!./public/scripts/**/*.min.js']),
            rename({
                suffix: '.min'
            }),
            uglify(),
            gulp.dest('./public/scripts')
        ], cb
    );
});

gulp.task('js', function () {
    gulp.watch(['app/scripts/**/*.js'], ['js:vendors', 'js:compile']);
    console.log('       Js watch running...');
    console.log('       Ctrl + C to stop.');
});
gulp.task('js:prod', ['js:uglify'], function () {});





//  FIND_SASS
/*
    .dP"Y8    db    .dP"Y8 .dP"Y8     888888    db    .dP"Y8 88  dP .dP"Y8
    `Ybo."   dPYb   `Ybo." `Ybo."       88     dPYb   `Ybo." 88odP  `Ybo."
    o.`Y8b  dP__Yb  o.`Y8b o.`Y8b       88    dP__Yb  o.`Y8b 88"Yb  o.`Y8b
    8bodP' dP""""Yb 8bodP' 8bodP'       88   dP""""Yb 8bodP' 88  Yb 8bodP'
*/
gulp.task('sass:compile', function () {
    return gulp.src(['./app/scss/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
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
    gulp.watch(['./app/scss/**/*.scss'], ['sass:compile']);
    console.log('       Sass watch running...');
    console.log('       Ctrl + C to stop.');
});

gulp.task('sass:prod', ['sass:minify'], function () {});





//  FIND_MAIN
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

gulp.task('default', ['assets', 'js', 'sass'], function () {
    livereload.listen({
        reloadPage: "index.php"
    });
    console.log('Default task running...');
    console.log('    - Assets watching,');
    console.log('    - Sass watching,');
    console.log('    - Javascript watching');
});