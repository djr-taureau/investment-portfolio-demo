import { Logger } from "./logger";

/**
 * Internal logger.
 */
const logger: Logger = Logger.getLogger("EventUtil");

/**
 * Enum used to indicate the requested event value type.
 */
export enum ValueTypes {
    STRING = "string",
    BOOLEAN = "boolean",
    NUMBER = "number"
}

/**
 * Getter for the value from an event.
 */
export function getValueFromEvent(event: any, valueType: string = "string"): any {
    const value: any = event.target.value;
    switch (valueType) {
        case ValueTypes.NUMBER:
            return parseInt(value, 10);

        case ValueTypes.BOOLEAN:
            return value === true || value.toLowerCase() === "true";

        case ValueTypes.STRING:
        default:
            return (value || "").trim();
    }
}

/**
 * Setter for the value from an event.
 */
export function setValueFromEvent(event: any, value: string | number): void {
    if (event.target.value) {
        event.target.value = String(value) || "";
    }
}

/**
 * Getter for the value of checked from an event.
 */
export function isChecked(event: any): boolean {
    return event.target.checked || false;
}
