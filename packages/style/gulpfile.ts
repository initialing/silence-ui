import { src, parallel, dest, series } from "gulp"
import dartSass from "sass"
import gulpSass from "gulp-sass"
import { resolve } from "path"
import autoprefixer from "gulp-autoprefixer"
import chalk from "chalk"
import cleanCss from "gulp-clean-css"
import rename from "gulp-rename"
import { siPath } from "../../path/path"


const sass = gulpSass(dartSass);

const dist = resolve(__dirname, "dist");
const distBundle = resolve(siPath, 'style')



function buildStyle(){
    let jumpPre = /(index|base)/;
    return src(resolve(__dirname, "src/**/*.scss"))
        .pipe(sass.sync())
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCss({},(details)=>{
            console.log(
                `${chalk.bgGrey(details.name)}: ${chalk.blue(
                        details.stats.originalSize/1000
                    )} KB -> ${chalk.green(
                        details.stats.minifiedSize / 1000
                    )} KB`
            );
        }))
        .pipe(rename(path => {
            if(!jumpPre.test(path.basename)){
                path.basename = `si-${path.basename}`;
            }
        }))
        .pipe(dest(dist))
}



export function copyThemeChalkBundle() {
    return src(`${dist}/**`).pipe(dest(distBundle))
}
  

  
export function copyThemeChalkSource() {
    return src(resolve(__dirname, 'src/**')).pipe(
        dest(resolve(distBundle, 'src'))
    )
}


export const build = parallel(
    copyThemeChalkSource,
    series(buildStyle, copyThemeChalkBundle)
)

export default build;