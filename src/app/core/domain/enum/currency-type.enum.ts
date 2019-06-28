export interface CurrencyType {
    name: string;
    symbol: string;
}
export class CurrencyTypeEnum {
    static readonly USD = { name: "USD", symbol: "$" } as CurrencyType;
    static readonly YEN = { name: "USD", symbol: "￥" } as CurrencyType;
    static readonly EUR = { name: "USD", symbol: "€" } as CurrencyType;
}
