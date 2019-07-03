export interface CurrencyType {
    code: string;
    symbol: string;
    description?: string;
}
export class CurrencyTypeEnum {
    static readonly AUD = { code: "AUD", symbol: "$", description: "Australia Dollar" } as CurrencyType;
    static readonly BRL = { code: "BRL", symbol: "R$", description: "Brazil Real" } as CurrencyType;
    static readonly CAD = { code: "CAD", symbol: "S", description: "Canadian Dollar" } as CurrencyType;
    static readonly CHF = { code: "CHF", symbol: "CHF", description: "Swiss Franc" } as CurrencyType;
    static readonly CNY = { code: "CNY", symbol: "¥", description: "China Yuan Renminbi" } as CurrencyType;
    static readonly CRC = { code: "CRC", symbol: "₡", description: "Costa Rican Colón" } as CurrencyType;
    static readonly CZK = { code: "CZK", symbol: "Kč", description: "Czech Koruna" } as CurrencyType;
    static readonly DKK = { code: "DKK", symbol: "kr.", description: "Danish Krone" } as CurrencyType;
    static readonly EUR = { code: "EUR", symbol: "€", description: "Euro" } as CurrencyType;
    static readonly GBP = { code: "GBP", symbol: "£", description: "British Pound Sterling" } as CurrencyType;
    static readonly HKD = { code: "HKD", symbol: "HK$", description: "Hong Kong Dollar" } as CurrencyType;
    static readonly IDR = { code: "IDR", symbol: "Rp", description: "Indonesian Rupiah" } as CurrencyType;
    static readonly ILS = { code: "ILS", symbol: "₪", description: "Israeli New Sheqel" } as CurrencyType;
    static readonly INR = { code: "INR", symbol: "₹", description: "Indian Rupee" } as CurrencyType;
    static readonly JPY = { code: "JPY", symbol: "¥", description: "Japanese Yen" } as CurrencyType;
    static readonly KRW = { code: "KRW", symbol: "₩", description: "South Korean Won" } as CurrencyType;
    static readonly MXN = { code: "MXN", symbol: "$", description: "Mexican Peso" } as CurrencyType;
    static readonly MYR = { code: "MYR", symbol: "RM", description: "Malaysian Ringgit" } as CurrencyType;
    static readonly NGN = { code: "NGN", symbol: "₦", description: "Nigerian Naira" } as CurrencyType;
    static readonly NOK = { code: "NOK", symbol: "kr", description: "Norway Krone" } as CurrencyType;
    static readonly PHP = { code: "PHP", symbol: "₱", description: "Philippine Peso" } as CurrencyType;
    static readonly PLN = { code: "PLN", symbol: "z", description: "Polish Zloty" } as CurrencyType;
    static readonly PYG = { code: "PYG", symbol: "₲", description: "Paraguayan Guarani" } as CurrencyType;
    static readonly SEK = { code: "SEK", symbol: "kr", description: "Sweden Krona" } as CurrencyType;
    static readonly SGD = { code: "SGD", symbol: "$", description: "Singapore Dollar" } as CurrencyType;
    static readonly THB = { code: "THB", symbol: "฿", description: "Thai Baht" } as CurrencyType;
    static readonly TRY = { code: "TRY", symbol: "TL", description: "Turkey Lira" } as CurrencyType;
    static readonly TWD = { code: "TWD", symbol: "NT$", description: "Taiwan New Dollar" } as CurrencyType;
    static readonly UAH = { code: "UAH", symbol: "₴", description: "Ukrainian Hryvnia" } as CurrencyType;
    static readonly USD = { code: "USD", symbol: "$", description: "US Dollar" } as CurrencyType;
    static readonly VND = { code: "VND", symbol: "₫", description: "Vietnamese Dong" } as CurrencyType;
    static readonly ZAR = { code: "ZAR", symbol: "R", description: "South African Rand" } as CurrencyType;
}
// OTHERS? Should come from Chronograph
