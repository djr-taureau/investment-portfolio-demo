import { Logger } from "./logger";
import * as EventUtil from "./event.util";
import * as KeyboardUtil from "./keyboard.util";
import * as StringUtil from "./string.util";

/**
 * Internal logger.
 */
const logger: Logger = Logger.getLogger("FormatterUtil");

/**
 * Formatting special characters and patterns.
 */
const FORMATTING = {
    SPECIAL_CHAR: {
        DASH: "-",
        FORWARD_SLASH: "/"
    },
    PATTERN: {
        SSN: [3, 2, 4],
        DATE: [2, 2, 4],
        ZIP_CODE: [5, 4],
        PHONE: [3, 3, 4]
    }
};

/**
 * Determines if formatting should be applied.
 */
export const shouldFormat = (keyCode: number): boolean => {
    return KeyboardUtil.isBackspaceOrDelete(keyCode) === false && KeyboardUtil.isArrowKey(keyCode) === false;
};

/**
 * String formatter.
 */
export const format = (input: string, formatPattern: number[], sep: string = "-") => {
    // remove separator so it's not included in the reformatting
    const removeAllSeparators = new RegExp(sep, "g");
    input = input.toString().replace(removeAllSeparators, "");
    let output = "";
    let idx = 0;
    for (let i = 0; i < formatPattern.length && idx < input.length; i++) {
        output += input.substr(idx, formatPattern[i]);
        if (idx + formatPattern[i] < input.length) {
            output += sep;
        }
        idx += formatPattern[i];
    }

    output += input.substr(idx);

    return output;
};

/**
 * Formats a string from a given text input event.
 * @param {any} event - Event from text input that fired the event.
 * @param {number[]} pattern - The array based pattern or grouping for the format; each group is separated by the
 * special character.
 * @param {string} specialCharacter - The special character used to separate each group of characters defined in the pattern.
 */
let lastFormattedLen = 0;
export const formatTextInputByEvent = (event: any, pattern: number[], specialCharacter: string): string => {
    const value: string = EventUtil.getValueFromEvent(event);
    if (shouldFormat(event.keyCode)) {
        let cursorIndex = event.target.selectionStart;
        const formattedValue: string = format(value, pattern, specialCharacter);
        const specialCharacterCount = StringUtil.getPatternCount(formattedValue, specialCharacter);
        const specialCharacterPosition = StringUtil.getPatternIndex(formattedValue, specialCharacter, specialCharacterCount);

        if (formattedValue.length >= lastFormattedLen + 2) {
            cursorIndex += 1;
        }
        lastFormattedLen = formattedValue.length;

        if (specialCharacterPosition === cursorIndex - 1) {
            cursorIndex += 1;
        }

        EventUtil.setValueFromEvent(event, formattedValue);
        event.target.selectionStart = cursorIndex;
        event.target.selectionEnd = cursorIndex;
        return formattedValue;
    } else {
        lastFormattedLen = EventUtil.getValueFromEvent(event).length;
    }
    return value;
};

/**
 * Formats a string into the form of an SSN: 111-11-1111.
 * @param {Event} event
 */
export const formatSsn = (event: Event) => {
    const specialCharacter = FORMATTING.SPECIAL_CHAR.DASH;
    const formatPattern: number[] = FORMATTING.PATTERN.SSN;
    formatTextInputByEvent(event, formatPattern, specialCharacter);
};

/**
 * Formats a string into the form of an date: MM/DD/YYYY.
 * @param {Event} event
 */
export const formatDate = (event: Event): string => {
    const specialCharacter = FORMATTING.SPECIAL_CHAR.FORWARD_SLASH;
    const formatPattern: number[] = FORMATTING.PATTERN.DATE;
    return formatTextInputByEvent(event, formatPattern, specialCharacter);
};

/**
 * Formats a string into the form of a zip currencyCode: 11111-1111.
 * @param {Event} event
 */
export const formatZipCode = (event: Event) => {
    const specialCharacter = FORMATTING.SPECIAL_CHAR.DASH;
    const formatPattern: number[] = FORMATTING.PATTERN.ZIP_CODE;
    formatTextInputByEvent(event, formatPattern, specialCharacter);
};

/**
 * Formats a string into the form of a phone number: 111-111-1111.
 * @param {Event} event
 */
export const formatPhoneNumber = (event: Event) => {
    const specialCharacter = FORMATTING.SPECIAL_CHAR.DASH;
    const formatPattern: number[] = FORMATTING.PATTERN.PHONE;
    formatTextInputByEvent(event, formatPattern, specialCharacter);
};
