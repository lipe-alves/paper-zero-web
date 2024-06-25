import { PASSWORD_MIN_LENGTH } from "@shared/constants";

const passwordValidationRules = {
    length: (value: string) => value.length >= PASSWORD_MIN_LENGTH,
    specialChars: (value: string) => /[!@#$%^&*(),.?":{}|<>]/g.test(value),
    numbers: (value: string) => /\d/g.test(value),
    letters: (value: string) => /[a-zA-Z]/g.test(value),
    uppercase: (value: string) => /[A-Z]/g.test(value),
    lowercase: (value: string) => /[a-z]/g.test(value),
};

export { passwordValidationRules };
export default passwordValidationRules;
