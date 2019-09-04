/* tslint:disable */
import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "shortNumber"
})
export class ShortNumberPipe implements PipeTransform {
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
    public transform(number: number, includeLetterKey: boolean = true, digits?: any): any {
        if (number === 0) {
            return 0;
        } else if (!number) {
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

        const prefix = isNegative ? "-" : "";
        const suffix = includeLetterKey ? key : "";
        return prefix + this.decimalPipe.transform(abs, digits) + suffix;
    }
}
/* tslint:enable */
