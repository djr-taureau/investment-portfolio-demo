import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "millions",
    pure: true
})
export class MillionsPipe implements PipeTransform {
    /**
     * Key for unknown values coming from the API, which is PI trimmed to 5 decimals, aka 3.14159.
     */
    private static UNKNOWN_KEY = parseFloat(Math.PI.toFixed(5));

    /**
     * Value to display for unknown values coming from the API.
     */
    private static UNKNOWN_VALUE = "N/A";

    /**
     * Represents a thousand.
     */
    private static THOUSAND = 1000;

    /**
     * Represents a million.
     */
    private static MILLION = MillionsPipe.THOUSAND * 1000;

    /**
     * Represents a billion.
     */
    private static BILLION = MillionsPipe.MILLION * 1000;

    /**
     * Represents a trillion.
     */
    private static TRILLION = MillionsPipe.BILLION * 1000;

    /**
     * Represents a quadrillion.
     */
    private static QUADRILLION = MillionsPipe.TRILLION * 1000;

    /**
     * Constructor.
     */
    constructor(private decimalPipe: DecimalPipe) {}

    /**
     * Convert the number into millions with one decimal place.
     */
    transform(value: any, digits: string = "1.1-1"): string {
        if (value === 0) {
            return "0";
        } else if (value === MillionsPipe.UNKNOWN_KEY || !value) {
            return MillionsPipe.UNKNOWN_VALUE;
        }

        if (value < MillionsPipe.MILLION) {
            value = value / MillionsPipe.THOUSAND;
        } else if (value >= MillionsPipe.MILLION && value < MillionsPipe.BILLION) {
            value = value / MillionsPipe.MILLION;
        } else if (value >= MillionsPipe.BILLION && value < MillionsPipe.TRILLION) {
            value = value / MillionsPipe.BILLION;
        } else if (value >= MillionsPipe.TRILLION && value < MillionsPipe.QUADRILLION) {
            value = value / MillionsPipe.TRILLION;
        } else if (value >= MillionsPipe.QUADRILLION) {
            value = value / MillionsPipe.QUADRILLION;
        }

        return this.decimalPipe.transform(value, digits, "en");
    }
}
