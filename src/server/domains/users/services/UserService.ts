import { CookieService } from "@server/services";
import { User } from "@shared/models";
import { mergeListsByProperty } from "@shared/utils";

class UserService {
    public static registerUser(user: User) {
        const usersJson = CookieService.get("users");
        if (!usersJson) return [];

        const oldUsers: User[] = JSON.parse(usersJson);
        const newUsers = mergeListsByProperty<User>("id", oldUsers, [user]);

        CookieService.set("users", JSON.stringify(newUsers));
    }

    public static listAllUsers() {
        const usersJson = CookieService.get("users");
        if (!usersJson) return [];

        const userList: User[] = JSON.parse(usersJson);
        return userList;
    }
}

export default UserService;
export { UserService };
