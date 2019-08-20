import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "billions",
    pure: true
})
export class BillionsPipe implements PipeTransform {
    /**
     * Constructor.
     */
    constructor(private decimalPipe: DecimalPipe) {}

    /**
     * Convert the number into millions with one decimal place.
     */
    transform(value: any, digits?: any): any {
        return this.decimalPipe.transform(value / 1000000000, digits);
    }
}