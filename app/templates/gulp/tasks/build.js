var gulp = require('gulp');

gulp.task('build', ['browserify', 'less', 'images', 'copy']);
