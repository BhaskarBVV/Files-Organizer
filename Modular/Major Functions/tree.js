const { dir } = require('console');
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const { dirname } = require("path/posix");



function treefn(dirPath) {
    if (dirPath == undefined) {
        console.log("please enter a valid path");
    }
    else {
        let doesExsit = fs.existsSync(dirPath);
        if (doesExsit == true)
            treeHelper(dirPath, " ");
    }
}


function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
    if (isFile == true) {
        console.log(indent + "├──" + path.basename(targetPath))
    }
    else {
        console.log(indent + "└──" + path.basename(targetPath));
        let children = fs.readdirSync(targetPath);
        for (let i = 0; i < children.length; i++) {
            treeHelper(path.join(targetPath, children[i]), "\t" + indent);
        }
    }
}

module.exports = {
    treeKey: treefn
}
