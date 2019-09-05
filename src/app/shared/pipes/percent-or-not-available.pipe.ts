import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Unknown } from "@core/domain/enum/unknown.enum";

@Pipe({
    name: "percentOrNa",
    pure: true
})
export class PercentOrNotAvailablePipe implements PipeTransform {
    /**
     * Constructor.
     */
    constructor(private decimalPipe: DecimalPipe) {}

    /**
     * Convert the number into millions with one decimal place.
     */
    transform(value: any, digits: string = "1.1-1"): string {
        if (value === 0) {
            return "0%";
        } else if (Unknown.isUnknownValue(value) || !value) {
            return Unknown.DISPLAY_VALUE;
        }

        return `${this.decimalPipe.transform(value, digits, "en")}%`;
    }
}
