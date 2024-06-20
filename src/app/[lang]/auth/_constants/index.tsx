import { Dashboard } from "@styled-icons/boxicons-solid";
import { Create, Help } from "@styled-icons/ionicons-outline";
import { Documents } from "@styled-icons/entypo";
import { Folders } from "@styled-icons/remix-line";

export const APP_DRAWER_BUTTONS = [
    {
        key: "section1",
        items: [
            {
                key: "dashboard",
                label: "Dashboard",
                icon: <Dashboard />,
                path: "/auth/dashboard",
            },
            {
                key: "signature-process-create",
                label: "Criar um processo de assinatura",
                icon: <Create />,
                path: "/auth/signature-process/create",
            },
            {
                key: "my-documents",
                label: "Meus documentos",
                icon: <Documents />,
                path: "/auth/documents/list",
            },
            {
                key: "folders",
                label: "Pastas",
                icon: <Folders />,
                path: "/auth/folders/list",
            },
        ],
    },
    {
        key: "section2",
        items: [
            {
                key: "dashboard",
                label: "Ajuda",
                icon: <Help />,
                path: "/auth/help",
            },
        ],
    },
];
