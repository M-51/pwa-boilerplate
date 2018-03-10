const gulp = require('gulp');
const rollup = require('rollup');


async function bundle() {
    const a = await rollup.rollup({
        input: './src/js/ajax/index.js',
    });
    await a.write({
        file: './dist/js/ajax/ajax.js',
        format: 'iife',
        name: 'ajax',
    });
}

function copyAjax() {
    return gulp.src('./dist/js/ajax/ajax.js')
        .pipe(gulp.dest('./server/static'));
}

function copySW() {
    return gulp.src('./src/js/worker/sw.js')
        .pipe(gulp.dest('./dist/js/worker'))
        .pipe(gulp.dest('./server/worker'));
}

const dev = gulp.series(bundle, copyAjax);

gulp.task('build', () => {
    gulp.watch('src/js/ajax/**/*.js', dev);
    gulp.watch('src/js/worker/**/*.js', copySW);
});
