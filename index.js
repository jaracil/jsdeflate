const zlibjs = require("zlibjs");
const base64js = require("base64-js")
var fs = require('fs');

const appRoot = require('app-root-path').path;



const main = ()=>{
    let inflateCode;
    let base64Code;
    try {
        inflateCode = fs.readFileSync(appRoot + "/node_modules/zlibjs/bin/rawinflate.min.js");
        base64Code = fs.readFileSync(appRoot + "/node_modules/base64-js/base64js.min.js");
    } catch (err){
        console.error(err);
        process.exit();
    }
    
} 

main();
