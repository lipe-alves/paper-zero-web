const execCommand = require("./exec-command.js");

async function dev() {
    await execCommand("node tasks/delete-zone-identifiers.js");
    await execCommand("node tasks/create-path-aliases.js");
    await execCommand("npx next build");
    await execCommand("npx next dev");
}

dev();
