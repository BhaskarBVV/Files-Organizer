let input = process.argv.slice(2); //input as : node editor.js organize 'D:\codes\Editors\test'
let cmd = input[0];
const fs = require('fs');
const { type } = require('os');
const path = require('path');
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    Photos: ["png", "jpeg", "jpg"],
};
switch (cmd) {
    case "tree":
        console.log("Tree implemented");
        break;
    case "organize":
        organizeFn(input[1])
        break;
    case "help":
        helpfn();
        break;
    default:
        console.log("Invalid command");
        break;
}
function helpfn() {
    console.log(`List of all commands: 
                1. tree cmd    - node Fo.jd tree <dirName>
                2. organize cmd- node FO.js orgainse <dirName>
                3. Help cmd    -  node FO.js help`);
}
function organizeFn(dirPath) {
    //dirPath is the input path that is to be organized.
    if (dirPath == undefined) {
        console.log("Please enter a valid path");
        return;
    }
    else {
        let dest_path;
        let doesExsit = fs.existsSync(dirPath);
        if (!doesExsit) {
            console.log("Not a valid folder/ path");
        }
        else {
            dest_path = path.join(dirPath, 'Organized_files');
            if (fs.existsSync(dest_path) == false) {
                fs.mkdirSync(dest_path);
            }
            orgainzeHelper(dirPath, dest_path);
        }
    }
}

function orgainzeHelper(src, dest) {
    // function to categorize our files.
    let names = fs.readdirSync(src); // lists all the files and folders of the source folder.
    for (let i = 0; i < names.length; i++) {

        // we cannot directly check whether given name is file or folder, we need entire path.
        let name_address = path.join(src, names[i]);
        let isFile = fs.lstatSync(name_address).isFile();
        // console.log(name_address, " ", isFile);

        if (isFile == true) {
            let file_category = getCategory(names[i]);
            // console.log(names[i], " belongs to ", file_category);
            sendfiles(name_address, dest, file_category);
        }
    }
}

function getCategory(file_name) {
    let extension = path.extname(file_name);
    // extension = extension.substring(1); or
    extension = extension.slice(1);

    for (let type in types) {
        let similar_ext_lists = types[type];
        for (let i = 0; i < similar_ext_lists.length; i++)
            if (similar_ext_lists[i] == extension)
                return type;
    }
    return 'others';
}


function sendfiles(SrcPathOfFile, Destpath, file_category) {
    let category_path = path.join(Destpath, file_category);
    if (fs.existsSync(category_path) == false)
        fs.mkdirSync(category_path);
    let file_name = path.basename(SrcPathOfFile);
    let DestpathOfFile = path.join(category_path, file_name);

    fs.copyFileSync(SrcPathOfFile, DestpathOfFile);
    fs.unlinkSync(SrcPathOfFile);
}
