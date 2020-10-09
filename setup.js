const fs = require("fs");

console.log("Seting up GoodMorningBot...")

checkDir("config")
checkDir("data", true)

fs.readdir('./plugins', (err, files) => { // Folders in Plugin folders does not include files insteand is has other dirs with more ".example" files
    if (err) console.error(err);
    files.forEach(f => {
        checkDir("plugins/" + f)
    })
});

function checkDir(dir, skip_warning = false) { // Check every file in a dictionary for ".example" files 
    fs.readdir(dir, (err, files) => {
        if (err) console.error(err);
        files.forEach(f => {
            renameFile(dir + "/" + f, skip_warning)
        })
    });
}

function renameFile(f, skip_warning = false) { // Removing ".example" in file names  
    if (f.toString().includes("example")) {
        fs.rename(f, f.replace(".example", ""), function (err) {
            if (err) console.log('ERROR: ' + err);
            if(!skip_warning) console.log("[NEED MANUAL EDIT]: " + f.replace(".example", ""))
        });
    }
}
