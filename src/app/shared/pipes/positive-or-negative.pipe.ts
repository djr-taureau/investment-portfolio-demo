import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "positiveOrNegative",
    pure: true
})
export class PositiveOrNegativePipe implements PipeTransform {
    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Add a plus in front of the value if positive; if negative then the minus is already there.
     */
    transform(value: number): string {
        return value === 0 ? `${value}` : value > 0 ? `+${value}` : `${value}`;
    }
}
