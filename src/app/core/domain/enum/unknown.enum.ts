export class Unknown {
    public static readonly API_VALUE = parseFloat(Math.PI.toFixed(5));
    public static readonly DISPLAY_VALUE = "NA";

    public static isUnknownValue(value: number): boolean {
        return value.toFixed(5) === String(Unknown.API_VALUE);
    }
}
