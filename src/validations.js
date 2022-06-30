const checkPassword = (password) => {
    const passwordLength = password.length;
    const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    let containsEightCharacters;

    if (passwordLength > 8) {
        containsEightCharacters = true;
    } else {
        containsEightCharacters = false;
    }
    const containsNumber = /\d/.test(password);
    const containsUppercase = /[A-Z]/.test(password);
    const containsSpecialCharacter = format.test(password);

    return {
        eight: containsEightCharacters,
        num: containsNumber,
        upper: containsUppercase,
        special: containsSpecialCharacter,
    };
};

const matchPassword = (password, newPasswordConf) => password === newPasswordConf;

const matchCurrPassword = (password, currentPassword) => currentPassword === password;

const checkMinMaxValue = (defaultValue, minValue, maxValue) => minValue <= defaultValue && defaultValue <= maxValue;

export { checkPassword, matchPassword, matchCurrPassword, checkMinMaxValue };
