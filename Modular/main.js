let input = process.argv.slice(2); //input as : node editor.js organise 'D:\codes\Editors\test'
let cmd = input[0];
const { dir } = require('console');
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const help = require("./Major functions/help")
const tree = require("./Major functions/tree")
const orgainze = require("./Major functions/organize")

switch (cmd) {
    case "tree":
        tree.treeKey(input[1])
        break;
    case "organize":
        orgainze.organizeKey(input[1])
        break;
    case "help":
        help.helpkey();
        break;
    default:
        console.log("Invalid command");
        break;
}



