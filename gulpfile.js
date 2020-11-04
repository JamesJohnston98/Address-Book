//require gulp module
var gulp = require('gulp');
//require the sass module.
var sass = require('gulp-sass');
//require the gulp-concat module
var concat = require('gulp-concat');
//require the gulp-postcss module
var postcss = require('gulp-postcss');
//require the autoprefixer module
var autoprefixer = require('autoprefixer');
//require the cssnano module
var cssnano = require('cssnano');

//function which is called style which will run to locate the .scss file which has been created within the production of the addressbook. This will then creae the css file as a style.css which will mean that the styling is generated and will place it in the css folder within the assignment folder. 


function style(){
    return(gulp.src("css/style.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest("css")));
}
exports.style = style;