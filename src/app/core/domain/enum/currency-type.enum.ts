export interface CurrencyType {
    currencyID?: number;
    currencyCode: string;
    currencySymbol: string;
    currencyDesc?: string;
}
export class CurrencyTypeEnum {
    static readonly AUD = { currencyCode: "AUD", currencySymbol: "$", currencyDesc: "Australia Dollar" } as CurrencyType;
    static readonly BRL = { currencyCode: "BRL", currencySymbol: "R$", currencyDesc: "Brazil Real" } as CurrencyType;
    static readonly CAD = { currencyCode: "CAD", currencySymbol: "S", currencyDesc: "Canadian Dollar" } as CurrencyType;
    static readonly CHF = { currencyCode: "CHF", currencySymbol: "CHF", currencyDesc: "Swiss Franc" } as CurrencyType;
    static readonly CNY = { currencyCode: "CNY", currencySymbol: "¥", currencyDesc: "China Yuan Renminbi" } as CurrencyType;
    static readonly CRC = { currencyCode: "CRC", currencySymbol: "₡", currencyDesc: "Costa Rican Colón" } as CurrencyType;
    static readonly CZK = { currencyCode: "CZK", currencySymbol: "Kč", currencyDesc: "Czech Koruna" } as CurrencyType;
    static readonly DKK = { currencyCode: "DKK", currencySymbol: "kr.", currencyDesc: "Danish Krone" } as CurrencyType;
    static readonly EUR = { currencyCode: "EUR", currencySymbol: "€", currencyDesc: "Euro" } as CurrencyType;
    static readonly GBP = { currencyCode: "GBP", currencySymbol: "£", currencyDesc: "British Pound Sterling" } as CurrencyType;
    static readonly HKD = { currencyCode: "HKD", currencySymbol: "HK$", currencyDesc: "Hong Kong Dollar" } as CurrencyType;
    static readonly IDR = { currencyCode: "IDR", currencySymbol: "Rp", currencyDesc: "Indonesian Rupiah" } as CurrencyType;
    static readonly ILS = { currencyCode: "ILS", currencySymbol: "₪", currencyDesc: "Israeli New Sheqel" } as CurrencyType;
    static readonly INR = { currencyCode: "INR", currencySymbol: "₹", currencyDesc: "Indian Rupee" } as CurrencyType;
    static readonly JPY = { currencyCode: "JPY", currencySymbol: "¥", currencyDesc: "Japanese Yen" } as CurrencyType;
    static readonly KRW = { currencyCode: "KRW", currencySymbol: "₩", currencyDesc: "South Korean Won" } as CurrencyType;
    static readonly MXN = { currencyCode: "MXN", currencySymbol: "$", currencyDesc: "Mexican Peso" } as CurrencyType;
    static readonly MYR = { currencyCode: "MYR", currencySymbol: "RM", currencyDesc: "Malaysian Ringgit" } as CurrencyType;
    static readonly NGN = { currencyCode: "NGN", currencySymbol: "₦", currencyDesc: "Nigerian Naira" } as CurrencyType;
    static readonly NOK = { currencyCode: "NOK", currencySymbol: "kr", currencyDesc: "Norway Krone" } as CurrencyType;
    static readonly PHP = { currencyCode: "PHP", currencySymbol: "₱", currencyDesc: "Philippine Peso" } as CurrencyType;
    static readonly PLN = { currencyCode: "PLN", currencySymbol: "z", currencyDesc: "Polish Zloty" } as CurrencyType;
    static readonly PYG = { currencyCode: "PYG", currencySymbol: "₲", currencyDesc: "Paraguayan Guarani" } as CurrencyType;
    static readonly SEK = { currencyCode: "SEK", currencySymbol: "kr", currencyDesc: "Sweden Krona" } as CurrencyType;
    static readonly SGD = { currencyCode: "SGD", currencySymbol: "$", currencyDesc: "Singapore Dollar" } as CurrencyType;
    static readonly THB = { currencyCode: "THB", currencySymbol: "฿", currencyDesc: "Thai Baht" } as CurrencyType;
    static readonly TRY = { currencyCode: "TRY", currencySymbol: "TL", currencyDesc: "Turkey Lira" } as CurrencyType;
    static readonly TWD = { currencyCode: "TWD", currencySymbol: "NT$", currencyDesc: "Taiwan New Dollar" } as CurrencyType;
    static readonly UAH = { currencyCode: "UAH", currencySymbol: "₴", currencyDesc: "Ukrainian Hryvnia" } as CurrencyType;
    static readonly USD = { currencyCode: "USD", currencySymbol: "$", currencyDesc: "US Dollar" } as CurrencyType;
    static readonly VND = { currencyCode: "VND", currencySymbol: "₫", currencyDesc: "Vietnamese Dong" } as CurrencyType;
    static readonly ZAR = { currencyCode: "ZAR", currencySymbol: "R", currencyDesc: "South African Rand" } as CurrencyType;
}
// OTHERS? Should come from Chronograph
