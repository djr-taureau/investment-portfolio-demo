import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Unknown } from "@core/domain/enum/unknown.enum";

@Pipe({
    name: "shortNumber",
    pure: true
})
export class ShortNumberPipe implements PipeTransform {
    /**
     * Represents a thousand.
     */
    private static THOUSAND = 1000;

    /**
     * Represents a million.
     */
    private static MILLION = ShortNumberPipe.THOUSAND * 1000;

    /**
     * Represents a billion.
     */
    private static BILLION = ShortNumberPipe.MILLION * 1000;

    /**
     * Represents a trillion.
     */
    private static TRILLION = ShortNumberPipe.BILLION * 1000;

    /**
     * Represents a quadrillion.
     */
    private static QUADRILLION = ShortNumberPipe.TRILLION * 1000;

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
        } else if (Unknown.isUnknownValue(value) || !value) {
            return Unknown.DISPLAY_VALUE;
        }

        if (value < ShortNumberPipe.MILLION) {
            value = value / ShortNumberPipe.THOUSAND;
        } else if (value >= ShortNumberPipe.MILLION && value < ShortNumberPipe.BILLION) {
            value = value / ShortNumberPipe.MILLION;
        } else if (value >= ShortNumberPipe.BILLION && value < ShortNumberPipe.TRILLION) {
            value = value / ShortNumberPipe.BILLION;
        } else if (value >= ShortNumberPipe.TRILLION && value < ShortNumberPipe.QUADRILLION) {
            value = value / ShortNumberPipe.TRILLION;
        } else if (value >= ShortNumberPipe.QUADRILLION) {
            value = value / ShortNumberPipe.QUADRILLION;
        }

        return this.decimalPipe.transform(value, digits, "en");
    }
}
