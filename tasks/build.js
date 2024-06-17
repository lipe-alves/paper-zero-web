const execCommand = require("./exec-command.js");

async function build() {
    await execCommand("npx next build");
}

build();
