const execCommand = require("./exec-command.js");
const getEnvVariables = require("./get-env-variables.js");

async function start() {
    const env = getEnvVariables();
    await execCommand("node tasks/delete-zone-identifiers.js");
    await execCommand("node tasks/create-path-aliases.js");
    await execCommand("npx next build");
    await execCommand(`npx next start -p ${env.PORT}`);
}

start();
