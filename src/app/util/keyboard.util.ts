/**
 * Determines if the key currencyCode passed in is the left arrow key.
 * @param {number} keyCode - The keycode to check if left arrow.
 */
export const isLeftArrowKey = (keyCode: number) => {
    return keyCode === 37;
};

/**
 * Determines if the key currencyCode passed in is the up arrow key.
 * @param {number} keyCode - The keycode to check if up arrow.
 */
export const isUpArrowKey = (keyCode: number) => {
    return keyCode === 38;
};

/**
 * Determines if the key currencyCode passed in is the right arrow key.
 * @param {number} keyCode - The keycode to check if right arrow.
 */
export const isRightArrowKey = (keyCode: number) => {
    return keyCode === 39;
};

/**
 * Determines if the key currencyCode passed in is the down arrow key.
 * @param {number} keyCode - The keycode to check if down arrow.
 */
export const isDownArrowKey = (keyCode: number) => {
    return keyCode === 40;
};

/**
 * Determines if the key currencyCode passed in is one of the arrow keys.
 * @param {number} keyCode - The keycode to check if arrow.
 */
export const isArrowKey = (keyCode: number) => {
    return isLeftArrowKey(keyCode) || isUpArrowKey(keyCode) || isRightArrowKey(keyCode) || isDownArrowKey(keyCode);
};

/**
 * Determines if the key currencyCode passed in is the enter key.
 * @param {number} keyCode - The keycode to check if enter.
 */
export const isEnterKey = (keyCode: number) => {
    return keyCode === 13;
};

/**
 * Determines if the key currencyCode passed in is the backspace key.
 * @param {number} keyCode - The keycode to check if backspace.
 */
export const isBackspace = (keyCode: number) => {
    return keyCode === 8;
};

/**
 * Determines if the key currencyCode passed in is the delete key.
 * @param {number} keyCode - The keycode to check if delete.
 */
export const isDelete = (keyCode: number) => {
    return keyCode === 46;
};

/**
 * Determines if the key currencyCode passed in is the backspace or delete key.
 * @param {number} keyCode - The keycode to check if backspace or delete.
 */
export const isBackspaceOrDelete = (keyCode: number) => {
    return isBackspace(keyCode) || isDelete(keyCode);
};
