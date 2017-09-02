var gulp = require("gulp");
var ts = require("gulp-typescript");
var rimraf = require("gulp-rimraf");
var tslint = require("gulp-tslint");
var watch = require("gulp-watch");
var nodemon = require("gulp-nodemon");
var sourcemaps = require("gulp-sourcemaps");
var runSequence = require("run-sequence");


// Config of gulp plugins
runSequence.options.showErrorStackTrace = false;

gulp.task("compile", function () {
    let project = ts.createProject("./tsconfig.json", { rootDir: "src" });
    let options = { 
        includeContent: false,
        sourceRoot: file => file
            .history[0]
            .replace((file).base, "")
            .split("\/")
            .map(() => "..")
            .slice(2)
            .join("/")
    };

    return project.src()
        .pipe(sourcemaps.init())
        .pipe(project())
        .js
        .pipe(sourcemaps.write(options))
        .pipe(gulp.dest("built"));
});

gulp.task("lint", function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({ configuration: "./tslint.json" }))
        .pipe(tslint.report({ summarizeFailureOutput: true }));
});

gulp.task("clean", function () {
    return gulp.src(["built"])
        .pipe(rimraf());
});

gulp.task("start", function(done) {
    const SCRIPT = "./built/app.js"

    let server = nodemon({
        script: SCRIPT,
        watch: ["built/**/*.*"],
        delay: 3000,
        exec: "node"
    });

    server.on("restart", function() {
        console.log(`nodemon restarted ${SCRIPT}`);
    });

    server.on("close", function() {
        done();
    });
});

gulp.task("watch", function() {
    watch(["src/**/*.ts"], () => runSequence("compile"));
});

gulp.task("default", function() {
    return runSequence("lint", "clean", "compile", ["start", "watch"]);
});
