export interface BasicApiResponse {
    // Simple string or boolean value of "success" or "failed"
    status: boolean | string;

    // Container for APi request data. Can be an object container or array container.
    // Should be used by the client to create domain models or similar.
    data: {} | any[];
}
export interface ApiResponse extends BasicApiResponse {
    // Simple string message that can provide additional detail on the API response; perhaps
    // with details on the data returned.
    message?: string;

    // List of errors associated with the API request. Example:
    // {
    //      "code": 1001,
    //      "field": "firstName",
    //      "message": "must not be blank Received value:null",
    //      "id": "5b1bdcf3-39da-47e1-ad8d-e5dc36cb4ca5"
    // }
    errors?: ApiError[];
}

export interface ApiError {
    // Specific API error code that clients can use to map to unique error messages
    // or create specific error flows.
    code: number;

    // Used when form POSTs with specific field errors and indicates the field name
    // in the request.
    field: string;

    // Custom message provided by the API for the error.
    message: string;

    // UUIDv4 used to track errors in logs especially when using PII data that's
    // omitted from logs.
    id: string;
}
