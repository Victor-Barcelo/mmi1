'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    minifyCSS = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha'),
    fs = require('fs'),
    yargs = require('yargs'),
    browserSync = require('browser-sync'),
    ftp = require('vinyl-ftp'),
    ngannotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber');
;

var config = require('./gulpUserConfig.json');

var env = yargs.argv.env || 'dev';

var gulpSSH = require('gulp-ssh')({
    ignoreErrors: false,
    sshConfig: {
        host: config.ssh.host,
        port: config.ssh.port,
        username: config.ssh.username,
        passphrase: config.ssh.passphrase,
        privateKey: require('fs').readFileSync(config.ssh.privateKeyPath)
    }
});

console.log('Enviroment: ' + env);

gulp.task('default', []);

gulp.task('test', function () {
    console.log(config.ftp.remoteSSHPath);
});

//---- Assorted
gulp.task('js', function () {
    return gulp.src(['./src/js/**/*.js'], {base: './src/js'})
        //.pipe(plumber())
        //.pipe(ngannotate())
        //.pipe(uglify())
        //.pipe(gulpif(env === 'dev', sourcemaps.init({loadMaps: true})))
        //.pipe(gulpif(env === 'dev', sourcemaps.write('./')))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function () {
    return gulp.src(['./src/*.html', './src/views/*.html'], {base: './src'})
        .pipe(plumber())
        .pipe(gulpif(env === 'prod', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:build', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('images', function () {
    return gulp.src('./src/images/**/*.{jpg,jpeg,png,gif}')
        .pipe(plumber())
        .pipe(changed('./build/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
        .pipe(size());
});

gulp.task('clean', function (cb) {
    del(['./build/*', '!./build/api'], cb);
});

//---- Watch & Browsersync
gulp.task('watch', function () {
    gulp.watch('./src/css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    var files = [
        './src/**/*.html',
        './src/views/*.html',
        './src/js/**/*.js',
        './src/css/*.css',
        './src/images/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './src'
        }
    });
});

//---- Build
gulp.task('build:dev', function () {
    env = 'dev';
    runSequence('clean',
        ['html', 'js', 'sass', 'images']
    );
});

gulp.task('build:prod', function () {
    env = 'prod';
    return runSequence('clean',
        ['html', 'js', 'sass:build', 'images']
    );
});

//----Deploy
gulp.task('deploy:run', function () {
    runSequence('build:prod', 'deploy:clean', 'deploy:uploadAll', 'deploy:uploadConfigs', 'deploy:copyConfigs', 'deploy:runComposer');
});

gulp.task('deploy:clean', function () {
    return gulpSSH
        .shell(['cd ' + config.ftp.remoteSSHPath, 'rm -rf *'])
        .pipe(gutil.noop());
});

gulp.task('deploy:uploadAll', function () {
    var conn = ftp.create({
        host: config.ftp.host,
        user: config.ftp.user,
        password: config.ftp.pass,
        parallel: 1,
        log: gutil.log
    });

    var globs = [
        'api/**/*',
        '!api/web/bundles/**/*',
        '!api/vendor/**/*',
        '!api/bin/**/*',
        '!api/app/cache/**/*',
        '!api/app/logs/**/*',
        'build/**/*',
        '!build/js/constants.js'
    ];

    return gulp.src(globs, {base: './build', buffer: false})
        .pipe(conn.newer('/')) // only upload newer files
        .pipe(conn.dest('/'));
});

gulp.task('deploy:uploadConfigs', function () {
    var conn = ftp.create({
        host: config.ftp.host,
        user: config.ftp.user,
        password: config.ftp.pass,
        parallel: 1,
        log: gutil.log
    });

    var globs = [
        'deployConfigs/.htaccess',
        'deployConfigs/constants.js'
    ];

    return gulp.src(globs, {base: './deploy_configs', buffer: false})
        .pipe(conn.newer('/')) // only upload newer files
        .pipe(conn.dest('/deployConfigs'));
});

gulp.task('deploy:copyConfigs', function () {
    return gulpSSH
        .shell(['cd ' + config.ftp.remoteSSHPath, 'cp deployConfigs/.htaccess api/', 'cp deployConfigs/constants.js js/'])
        .pipe(gutil.noop());
});

gulp.task('deploy:runComposer', function () {
    return gulpSSH
        .shell(['cd ' + config.ftp.remoteSSHPath, 'export SYMFONY_ENV=prod', 'cd api', 'php composer.phar install --no-dev --optimize-autoloader', 'php app/console cache:clear --env=prod --no-debug'])
        .pipe(gutil.noop());
});