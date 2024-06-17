const fs = require("fs");
const path = require("path");

const TS_CONFIG_PATH = path.join(__dirname, "../tsconfig.json");
const SRC_PATH = path.join(__dirname, "../src");

/**
 * Creates a path alias for each folder under the src folder
 * @returns {void}
 */
function createPathAliases() {
    const tsConfig = JSON.parse(fs.readFileSync(TS_CONFIG_PATH));

    // Reset path aliases
    tsConfig.compilerOptions.paths = {
        "@root/*": ["./src/*"],
    };

    const srcDirs = fs
        .readdirSync(SRC_PATH)
        .filter((path) => !path.includes("."));

    for (const dirname of srcDirs) {
        tsConfig.compilerOptions.paths[`@${dirname}/*`] = [
            `./src/${dirname}/*`,
        ];
    }

    fs.writeFileSync(TS_CONFIG_PATH, JSON.stringify(tsConfig, null, 4));
}

createPathAliases();
