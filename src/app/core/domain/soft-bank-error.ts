export enum SoftBankErrorType {
    RUNTIME = "runtime",
    API = "api",
    API_404 = "api404",
    OFFLINE = "offline",
    SESSION_EXPIRED = "sessionExpired",
    GENERIC = "generic"
}

export interface SoftBankError {
    title: string;
    message?: string;
    code?: string;
    visible: boolean;
    type: string;
}
