import { PASSWORD_MIN_LENGTH } from "@shared/constants";
import { ReplaceMatrix } from "@shared/types";
import passwordValidationRules from "./passwordValidationRules";

function passwordRuleToLabel(
    t: (text: string, replaceMatrix?: ReplaceMatrix) => string,
    rule: keyof typeof passwordValidationRules
) {
    const labels = {
        length: t("A senha deve ter pelo menos @passwordMinLength caracteres", {
            passwordMinLength: String(PASSWORD_MIN_LENGTH),
        }),
        specialChars: t("A senha deve conter pelo menos um caractere especial"),
        numbers: t("A senha deve conter pelo menos um número"),
        letters: t("A senha deve conter pelo menos uma letra"),
        uppercase: t("A senha deve conter pelo menos uma letra maiúscula"),
        lowercase: t("A senha deve conter pelo menos uma letra minúscula"),
    };

    return labels[rule];
}

export { passwordRuleToLabel };
export default passwordRuleToLabel;
