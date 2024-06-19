export const APPLICATION_NAME = "PaperZero";
export const IMAGE_EXTENSIONS = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "tiff",
    "ico",
    "svg",
];
export const PASSWORD_MIN_LENGTH = 8;

export const RESPONSE_CODES = {
    SUCCESS: "SUCCESS" as const,
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR" as const,
    RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND" as const,
    CLIENT_ERROR: "CLIENT_ERROR" as const,
    UNAUTHENTICATED: "UNAUTHENTICATED" as const,
    UNAUTHORIZED: "UNAUTHORIZED" as const,
};
