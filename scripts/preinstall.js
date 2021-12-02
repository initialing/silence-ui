if(!/pnpm/.test(process.env.npm_execpath || '')){

    console.warn("please use the pnpm package manager");
    
    process.exit(1)

}