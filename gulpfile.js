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
    'node_modules/angular-route/angular-route.js'
];

var css = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'client/css/**/*.css'
];

var views = [
    'views/index.html',
    'views/welcome_page.html',
    'views/users-view.html',
    'views/templates/*.html'
];

var client_src = ['client/js/**/*.js'];

gulp.task('clean', () => {
    return rimraf("build/**/*.*", { nosort: true, silent: true }, function(){});
});

gulp.task('lib_js', () => {
    return gulp.src(libs)
        .pipe(concat('libs.js'))
        .pipe(gulpif(args.release, uglify()))
        .pipe(gulp.dest('build/'))
});

gulp.task('client_js', () => {
    return gulp.src(client_src)
        .pipe(concat('bundle.js'))
        .pipe(gulpif(args.release, uglify()))
        .pipe(gulp.dest('build/'))
});

gulp.task('js', ['lib_js', 'client_js']);

gulp.task("watch", () => {
    gulp.watch(client_src.concat(css).concat(views), ['html', 'client_js', 'css']);
});

gulp.task("server", () => {
    return server.run(['server.js']);
});

gulp.task("css", () => {
    return gulp.src(css)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/'))
});

gulp.task("build", ['clean', 'js', 'css', 'watch']);

gulp.task('seed', () => {
    return run('node seed.js').exec();
});

gulp.task('html', () => {
    return gulp.src(views)
        .pipe(gulp.dest('build/'))
});

gulp.task('data', () => {
    return gulp.src('mock_data.json')
        .pipe(gulp.dest('build/'))
});

gulp.task("default", ['data', 'html', 'js', 'css', 'server', 'watch']);