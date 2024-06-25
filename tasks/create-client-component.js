const fs = require("fs");
const path = require("path");

createClientComponent();

function createClientComponent() {
    const params = {};

    for (const arg of process.argv) {
        if (arg.includes("--")) {
            const [key, value] = arg.replace("--", "").split("=");
            params[key] = value;
        }
    }

    const { type = "ui", name = "MyComponent" } = params;

    const componentPath = path.join(
        __dirname,
        `../src/client/components/${type}/${name}/index.tsx`
    );
    const stylesPath = path.join(
        __dirname,
        `../src/client/components/${type}/${name}/styles.module.scss`
    );
    const indexPath = path.join(
        __dirname,
        `../src/client/components/${type}/index.ts`
    );

    const componentContent = `import React from "react";
import styles from "./styles.module.scss";

interface ${name}Props {
}

function ${name}(props: ${name}Props) {
    return <div className={styles.${name}}></div>;
}

export default ${name};
export { ${name} };
export type { ${name}Props };
`;

    const stylesContent = `.${name} {
}
`;

    let indexContent = fs.readFileSync(indexPath, "utf-8");
    const exportStatements = indexContent.split("\n").filter(Boolean);
    exportStatements.push(`export * from "./${name}";`);
    indexContent = exportStatements.join("\n") + "\n";

    if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(path.dirname(componentPath), { recursive: true });
    }

    if (!fs.existsSync(stylesPath)) {
        fs.mkdirSync(path.dirname(stylesPath), { recursive: true });
    }

    if (!fs.existsSync(indexPath)) {
        fs.mkdirSync(path.dirname(indexPath), { recursive: true });
    }

    fs.writeFileSync(stylesPath, stylesContent);
    console.log(`Created styles ${stylesPath}`);

    fs.writeFileSync(componentPath, componentContent);
    fs.writeFileSync(indexPath, indexContent);
    console.log(`Created component ${componentPath}`);
}
