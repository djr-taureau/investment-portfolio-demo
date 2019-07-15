import { FormControl, ValidationErrors, FormGroup } from "@angular/forms";

export const REGEX_PATTERN = {
    ALPHA_ONLY: /^[a-zA-Z]+$/,
    ALPHA_ONLY_WITH_SPACES: /^[a-zA-Z\s]+$/,
    NO_NUMBERS: /^([^0-9]*)$/,
    SSN: /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/,
    ZIP_CODE: /^[0-9]{5}(?:-[0-9]{4})?$/,
    PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/
};

export const alphaOnly = (control: FormControl): ValidationErrors | null => {
    const value = control.value || "";
    if (value.length > 0) {
        const pattern = REGEX_PATTERN.ALPHA_ONLY_WITH_SPACES;

        if (!pattern.test(value)) {
            return { alphaOnly: "Must only contain alpha characters" };
        }
    }

    // If no error, return null
    return null;
};

export const noNumbers = (control: FormControl): ValidationErrors | null => {
    const value = control.value || "";
    if (value.length > 0) {
        const pattern = REGEX_PATTERN.NO_NUMBERS;

        if (!pattern.test(value)) {
            return { noNumbers: "Cannot contain numeric characters" };
        }
    }

    // If no error, return null
    return null;
};

/**
 * Validates SSN form inputs.
 */
export const validateSsn = (control: FormControl): ValidationErrors | null => {
    const value = control.value || "";
    if (value.length > 0) {
        const pattern = REGEX_PATTERN.SSN;

        if (!pattern.test(value)) {
            return { ssn: "SSN must be nine digits" };
        }
    }

    // If no error, return null
    return null;
};

/**
 * Validates a gender form field.
 */
export const validateGender = (control: FormControl): ValidationErrors | null => {
    const value = control.value || "";
    const isMale = value === "M";
    const isFemale = value === "F";
    const isOther = value === "O";
    const isUknown = value === "U";

    if (!(isMale || isFemale || isUknown || isOther)) {
        // Invalid gender, return error.
        return { gender: "Gender is required" };
    }
    // If no error, return null
    return null;
};

/**
 * Validates a zip currencyCode form field.
 */
export const validateZipCode = (control: FormControl): ValidationErrors | null => {
    const value = control.value || "";
    const pattern = REGEX_PATTERN.ZIP_CODE;

    if (!pattern.test(value)) {
        return { zip: "Zip must 5 or 9 digits." };
    }
    // If no error, return null
    return null;
};

/**
 * Validates a phone number form field.
 */
export const validatePhoneNumber = (control: FormControl): ValidationErrors | null => {
    const value = (control.value || "").replace(/\s|-/g, "");
    if (value === "") {
        return null;
    }
    const numbersOnly: number = parseInt(value, 10);

    if (isNaN(numbersOnly) || value.length !== 10) {
        return { phoneNumber: "Must have 10 digits and and only number." };
    }
    // If no error, return null
    return null;
};

/**
 * Validates a password form field.
 */

export const validatePassword = (control: FormControl): ValidationErrors | null => {
    const value = control.value || "";
    const pattern = REGEX_PATTERN.PASSWORD;
    if (!pattern.test(value) && control.value !== "") {
        return { invalidPassword: "Password should meet the requirements" };
    }
    // If no error, return null
    return null;
};

/**
 * Custom validator function to ensure the password and confirm password fields match.
 */
export function mismatchedPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
        const password = group.controls[passwordKey];
        const confirmPassword = group.controls[confirmPasswordKey];

        if (confirmPassword.value !== "" && password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
        return null;
    };
}

/**
 * List of validation data for form fields.
 */
export const VALIDATION_RULE = {
    USERNAME: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 80
    },
    PASSWORD: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 80
    },
    FIRST_NAME: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 80
    },
    LAST_NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 80
    },
    EMAIL: {
        MAX_LENGTH: 80
    },
    PHONE_NUMBER: {
        MIN_LENGTH: 12,
        MAX_LENGTH: 12
    },
    ZIP_CODE: {
        MIN_LENGTH: 5,
        MAX_LENGTH: 10
    },
    BIRTH_DATE: {
        // MAX: moment().format(DateUtil.CLIENT_DATE_FORMAT)
    },
    DATE: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 10
    },
    SSN: {
        MIN_LENGTH: 9,
        MAX_LENGTH: 11
    }
};
