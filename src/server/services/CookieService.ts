import Cookies from "js-cookie";

interface CookieOptions {
    /**
     * Define when the cookie will be removed. Value can be a Number
     * which will be interpreted as days from time of creation or a
     * Date instance. If omitted, the cookie becomes a session cookie.
     */
    expires?: number | Date | undefined;

    /**
     * Define the path where the cookie is available. Defaults to '/'
     */
    path?: string | undefined;

    /**
     * Define the domain where the cookie is available. Defaults to
     * the domain of the page where the cookie was created.
     */
    domain?: string | undefined;

    /**
     * A Boolean indicating if the cookie transmission requires a
     * secure protocol (https). Defaults to false.
     */
    secure?: boolean | undefined;

    /**
     * Asserts that a cookie must not be sent with cross-origin requests,
     * providing some protection against cross-site request forgery
     * attacks (CSRF)
     */
    sameSite?:
        | "strict"
        | "Strict"
        | "lax"
        | "Lax"
        | "none"
        | "None"
        | undefined;
}

class CookieService {
    public static set(
        key: string,
        value: string,
        options?: CookieOptions
    ): void {
        Cookies.set(key, value, options);
    }

    public static get(key: string): string | undefined {
        return Cookies.get(key);
    }

    public static remove(key: string): void {
        Cookies.remove(key);
    }
}

export default CookieService;
export { CookieService };
export type { CookieOptions };
