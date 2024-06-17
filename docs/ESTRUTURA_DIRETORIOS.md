# Estrutura de Diretórios

```
📂 paper-zero-web
├── 📂 src
│   ├── 📂 app
│   ├── 📂 client 
│   │   ├── 📂 assets
│   │   │   ├── 📂 fonts
│   │   │   ├── 📂 icons
│   │   │   └── 📂 images
│   |   ├── 📂 components
│   │   │   ├── 📂 [ComponentName]
│   │   │   │   ├── 📄 index.tsx
│   │   │   │   └── 📄 styles.module.scss
│   │   │   └── 📄 index.ts
│   |   ├── 📂 hooks
│   │   │   ├── 📄 use[HookName].ts
│   │   │   └── 📄 index.ts
│   |   ├── 📂 providers
│   │   │   ├── 📄 [ProviderName].tsx
│   │   │   └── 📄 index.ts
│   │   └── 📂 styles
│   ├─── 📂 server
│   |   ├── 📂 errors 
│   |   ├── 📂 middlewares
│   |   ├── 📂 services
│   |   └── 📂 domains
│   |       └── 📂 [domainName]
│   |           ├── 📂 controllers
│   |           ├── 📂 use-cases
│   |           ├── 📂 errors
│   |           └── 📂 middlewares
│   └─── 📂 shared
│       ├── 📂 constants
│       │   ├── 📄 [contextName].ts
│       │   └── 📄 index.ts
│       ├── 📂 utils
│       │   ├── 📄 [functionName].ts
│       │   ├── 📄 [objectName].ts
│       │   ├── 📄 [ClassName].ts
│       │   └── 📄 index.ts
│       ├── 📂 i18n
│       ├── 📂 models
│       ├── 📂 services
│       │   ├── 📄 [objectName].ts
│       │   ├── 📄 [ClassName].ts
│       │   └── 📄 index.ts
│       └── 📂 types
│       │   ├── 📄 [contextName].ts
│       │   └── 📄 index.ts
└── 📂 __TESTS__
```