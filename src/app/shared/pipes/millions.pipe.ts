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
        return this.decimalPipe.transform(value / 1000000, digits, "en");
    }
}
