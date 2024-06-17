const fs = require("fs");
const path = require("path");

/**
 * Deletes .Identifier file that appear when we copy and paste files from Windows file system to WSL
 * @param {string} directory
 * @returns {void}
 */
function deleteZoneIdentifiers(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                deleteZoneIdentifiers(fullPath);
            } else if (fullPath.includes(".Identifier")) {
                fs.unlink(fullPath, (err) => {
                    if (err) throw err;
                    console.log(`Deleted file ${fullPath}`);
                });
            }
        }
    });
}

deleteZoneIdentifiers("../");
