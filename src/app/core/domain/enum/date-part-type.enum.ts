export interface DatePartType {
    name: string;
    id: string;
}
export class DatePartTypeEnum {
    static readonly MON = { name: "MON", id: "M" } as DatePartType;
    static readonly QTR = { name: "QTR", id: "Q" } as DatePartType;
    static readonly YEAR = { name: "YEAR", id: "Y" } as DatePartType;
}
