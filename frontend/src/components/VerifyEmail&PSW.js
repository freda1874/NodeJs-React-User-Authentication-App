

export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function validatePassword(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isValidLength = password.length >= 6;
    return hasLetter && hasDigit && isValidLength;
}
