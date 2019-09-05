/* tslint:disable */
import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "shortNumber",
    pure: true
})
export class ShortNumberPipe implements PipeTransform {
    /**
     * Key for unknown values coming from the API, which is PI trimmed to 5 decimals, aka 3.14159.
     */
    private static UNKNOWN_KEY = parseFloat(Math.PI.toFixed(5));

    /**
     * Constructor.
     */
    constructor(private decimalPipe: DecimalPipe) {}

    /**
     * Transforms numbers in the thousands, millions, billions, etc to shorter numbers
     * @param number
     * @param includeLetterKey
     * @param digits
     */
    public transform(number: number, includeLetterKey: boolean = true, digits?: any): string {
        if (number === 0) {
            return "0";
        } else if (number === ShortNumberPipe.UNKNOWN_KEY || !number) {
            return "N/A";
        }

        let abs = Math.abs(number);
        const rounder = Math.pow(10, 1);
        const isNegative = number < 0; // will also work for Negetive numbers
        let key = "";

        const powers = [
            { key: "Q", value: Math.pow(10, 15) },
            { key: "T", value: Math.pow(10, 12) },
            { key: "B", value: Math.pow(10, 9) },
            { key: "M", value: Math.pow(10, 6) },
            { key: "K", value: 1000 }
        ];

        for (let i = 0; i < powers.length; i++) {
            let reduced = abs / powers[i].value;
            // reduced = Math.round(reduced * rounder) / rounder;
            reduced = (reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }

        // TODO
        abs = number / 1000000;

        const prefix = isNegative ? "-" : "";
        const suffix = includeLetterKey ? key : "";
        return prefix + this.decimalPipe.transform(abs, digits, "en") + suffix;
    }
}
/* tslint:enable */
