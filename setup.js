const fs = require("fs");

console.log("Seting up GoodMorningBot...")

checkDir("config")

fs.readdir('./plugins', (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        checkDir("plugins/" + f)
    })
});

function checkDir(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) console.error(err);
        files.forEach(f => {
            renameFile(dir + "/" + f)
        })
    });
}

function renameFile(f) {
    if (f.toString().includes("example")) {
        fs.rename(f, f.replace(".example", ""), function (err) {
            if (err) console.log('ERROR: ' + err);
            console.log("[NEED MANUEL EDIT]: " + f.replace(".example", ""))
        });
    }
}
