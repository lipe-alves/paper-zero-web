import { CookieService } from "@server/services";
import { User } from "@shared/models";

class AuthService {
    public static login(user: User) {
        CookieService.set("auth", JSON.stringify(user));
    }

    public static getCurrentSession() {
        const authJson = CookieService.get("auth");
        if (!authJson) return undefined;

        const auth = JSON.parse(authJson);
        const user = new User(auth);

        return user;
    }

    public static logout() {
        CookieService.set("auth", JSON.stringify({}));
    }
}

export default AuthService;
export { AuthService };
