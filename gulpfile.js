var gulp = require("gulp"),
    rimraf = require("rimraf"),
    uglify = require("gulp-uglify"),
    server = require("gulp-express"),
    args = require('yargs').argv,
    gulpif = require('gulp-if'),
    run = require('gulp-run'),
    concat = require("gulp-concat");

var libs = [
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/requirejs/require.js',
    'node_modules/lodash/lodash.js'
];

var css = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'src/css/**/*.css'
];

var views = [
    'src/views/**/*.html'
];

var client_src = [
    'src/js/**/*.js'
];

gulp.task('clean', () => {
    return rimraf("build/**/*.*", { nosort: true, silent: true }, function(){});
});

gulp.task('lib_js', () => {
    return gulp.src(libs)
        //.pipe(concat('libs.js'))
        .pipe(gulpif(args.release, uglify()))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('client_js', () => {
    return gulp.src(client_src)
        //.pipe(concat('bundle.js'))
        .pipe(gulpif(args.release, uglify()))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('js', ['lib_js', 'client_js']);

gulp.task("watch", () => {
    gulp.watch(client_src
        .concat(css)
        .concat(views),
        ['html', 'client_js', 'css']);
});

gulp.task("server", () => {
    return server.run(['server.js']);
});

gulp.task("css", () => {
    return gulp.src(css)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task("build", ['clean', 'js', 'css', 'watch']);

gulp.task('seed', () => {
    return run('node seed.js').exec();
});

gulp.task('html', () => {
    return gulp.src(views)
        .pipe(gulp.dest('build/views'))
});

gulp.task('data', () => {
    return gulp.src('mock_data.json')
        .pipe(gulp.dest('build/'))
});

gulp.task('fonts', () => {
    return gulp.src('node_modules/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task("default", ['clean', 'data', 'fonts', 'html', 'js', 'css', 'server', 'watch']);