import { spawn } from "child_process";
import { red } from "chalk"


export function excute(ex:string) {
    return new Promise<void>((resolve, reject)=>{
        const [cmd, ...args] = ex.split(" ");
        try{
            let app = spawn(cmd, args,{
                stdio: "inherit"
            });
            const onProcessExit = () => app.kill('SIGHUP')
            app.on('close', (code) => {
            process.removeListener('exit', onProcessExit)

            if (code === 0) resolve()
            else
                reject(
                new Error(`Command failed. \n Command: ${cmd} \n Code: ${code}`)
                )
            })
            process.on('exit', onProcessExit)
        } catch(e:any){
            console.log(red(e.message))
        }
    })
}
