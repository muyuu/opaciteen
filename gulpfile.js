const g = require("gulp");
const $ = require( 'gulp-load-plugins' )();
const connect = require('gulp-connect');

// local server
g.task("connect", () => {
    connect.server({
        port      : 3000,
        livereload: true
    });

    g.src("./index.html")
    .pipe($.open({
        url: "http://localhost:3000",
        app: "Google Chrome"
    }));
});

g.task('css', ()=>{
    g.src(['src/css/style.sass'])
    .pipe($.sass())
    .pipe(g.dest('./'));
});

g.task('babel', ()=>{
    g.src(['src/js/opaciteen.js'])
    .pipe($.babel({
        presets: ['es2015']
    }))
    .pipe(g.dest('./'));
});

g.task('lint', ()=>{
    g.src(['opaciteen.js', 'app.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());
});


g.task('dev', ['babel'], ()=>{
    g.start(['lint']);
});

g.task("default", ['connect'], ()=>{
    g.watch("src**/*.js", ["dev"]);
    g.watch("src/**/*.sass", ["css"]);
});


 //build
g.task('build', ['dev'], ()=>{
    g.src('./opaciteen.js')
    .pipe($.sourcemaps.init())
    .pipe($.rename({
        basename: "opaciteen.min",
        extname: ".js"
    }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(g.dest('./'));
});


