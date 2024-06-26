import { EntityId } from "@shared/types";
import { generateId } from "@shared/utils";

class User {
    public id: EntityId;
    public name: string;
    public email: string;
    public phone?: string;
    public password: string;

    constructor(data: Partial<User> = {}) {
        const {
            id = generateId(),
            name = "",
            firstName = "",
            lastName = "",
            email = "",
            phone = "",
            password = "",
        } = data;

        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;

        if (firstName) this.firstName = firstName;
        if (lastName) this.lastName = lastName;
    }

    public get firstName() {
        const [firstName = ""] = this.name.split(" ");
        return firstName;
    }

    public set firstName(value: string) {
        const firstName = this.firstName;
        this.name = this.name.replace(firstName, value);
    }

    public get lastName() {
        const [, ...lastNames] = this.name.split(" ");
        return lastNames.join(" ");
    }

    public set lastName(value: string) {
        const firstName = this.firstName;
        this.name = [firstName, value].join(" ");
    }
}

export default User;
export { User };
