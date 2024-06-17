const validator = {
    cpf: (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, "");

        if (cpf === "") return false;

        // Eliminates known invalid CPFs
        if (
            cpf.length != 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999"
        ) {
            return false;
        }

        // Validates 1st digit
        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;

        // Validates 2nd digit
        add = 0;
        for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }

        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;

        return true;
    },
    cnpj: (cnpj: string) => {
        cnpj = cnpj || "";
        cnpj = cnpj.replace(/[^\d]+/g, "");
        if (cnpj === "") return false;
        if (cnpj.length != 14) return false;

        if (
            cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999"
        ) {
            return false;
        }

        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        let digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;
        for (let i = size; i >= 1; i--) {
            sum += Number(numbers.charAt(size - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== Number(digits.charAt(0))) return false;

        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
        for (let i = size; i >= 1; i--) {
            sum += Number(numbers.charAt(size - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== Number(digits.charAt(1))) return false;

        return true;
    },
    rg: (rg: string) => {
        return !!rg.match(/^\d+$/) && rg.length > 3;
    },
    email: (value: string) => {
        // Regexp for email validation
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !!re.test(value.toLowerCase());
    },
    url: (value: string) => {
        // Regexp for URL validation
        const regexQuery =
            "^(ht|f)tp(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_+.=$*@!?:]*)?$";
        const url = new RegExp(regexQuery, "i");
        return url.test(value);
    },
};

export default validator;
export { validator };
