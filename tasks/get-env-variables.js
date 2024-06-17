const fs = require("fs");

const ENV_FILE_PATH = ".env";

/**
 * Gets the environment variables from the.env file
 * @returns {{
 *     [key: string]: string | undefined;
 * }}
 */
function getEnvVariables() {
    const envData = fs.readFileSync(ENV_FILE_PATH, "utf8");
    const lines = envData.split("\n");
    const envObject = {};

    for (const line of lines) {
        const [key, value] = line.split("=");
        if (key && value) {
            envObject[key.trim()] = value.trim();
        }
    }

    return envObject;
}

module.exports = getEnvVariables;
