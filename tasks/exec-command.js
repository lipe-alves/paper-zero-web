const { spawn } = require("child_process");
const path = require("path");

/**
 * @typedef SpawnOptionsWithoutStdio
 * @type {import("child_process").SpawnOptionsWithoutStdio}
 */

/**
 * Executes a CMD command and returns the result
 * @param {string} command
 * @param {SpawnOptionsWithoutStdio=} options
 * @returns {Promise<string>}
 */
function execCommand(command, options = {}) {
    console.log(">", command);

    const [cmd, ...args] = command.split(" ");
    const { cwd = path.join(__dirname, "../") } = options;

    const childProcess = spawn(cmd, [...args], { ...options, cwd });

    childProcess.stdin.on("data", (data) => console.log(data.toString()));
    childProcess.stdout.on("data", (data) => console.log(data.toString()));
    childProcess.stderr.on("data", (data) => console.log(data.toString()));

    return new Promise((resolve, reject) => {
        childProcess.on("exit", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject();
            }
        });

        childProcess.on("error", reject);
    });
}

module.exports = execCommand;
