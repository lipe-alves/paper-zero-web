import { cookies } from "next/headers";

interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    path?: string;
    maxAge?: number;
    sameSite?: boolean | "strict" | "lax" | "none" | undefined;
}

class CookieService {
    public static set(
        key: string,
        value: string,
        options: CookieOptions = {}
    ): void {
        cookies().set(key, value, options);
    }

    public static get(key: string): string | undefined {
        const cookie = cookies().get(key);
        return cookie?.value;
    }

    public static remove(key: string): void {
        cookies().delete(key);
    }
}

export default CookieService;
export { CookieService };
export type { CookieOptions };
