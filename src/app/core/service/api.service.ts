import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "@util/logger";
import { Observable, throwError as _throw } from "rxjs";
/*
 * @currencyDesc:
 *
 *  Base class for all API service interaction.
 */
@Injectable({
    providedIn: "root"
})
export class ApiService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ApiService");

    public get(url: string, responseType?: ResponseType, params?: HttpParams): Observable<any> {
        const options = this.createOptions(responseType, params);

        return this.http.get(url, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public getBlob(url: string): Observable<any> {
        const options = this.createOptions("blob");

        return this.http.get(url, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public getBlobByFileType(url: string, params = null, fileType: RequestTypes): Observable<any> {
        const headers = new HttpHeaders({
            "Content-Type": "application/" + fileType
        });
        const options = this.createOptions("blob", params, headers);

        return this.http.get(url, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public post(url: string, body: any | null): Observable<any> {
        const options = this.createOptions();

        return this.http.post(url, body, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public put(url: string, body?: any | null): Observable<any> {
        const options = this.createOptions();

        return this.http.put(url, body, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public patch(url: string, body?: any | null): Observable<any> {
        const options = this.createOptions();

        return this.http.patch(url, body, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public delete(url: string, body: any | null): Observable<any> {
        const options = this.createOptions();

        return this.http.delete(url, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    public deleteWithBody(url: string, body: any | null): Observable<any> {
        const options = this.createDeleteWithBodyOptions("json", body);

        return this.http.delete(url, options as any).pipe(catchError(this.fault)) as Observable<any>;
    }

    private createOptions(responseType: ResponseType = "json", params?: HttpParams, headers?: HttpHeaders): HttpOptions {
        return {
            responseType,
            params,
            headers
        };
    }

    private createDeleteWithBodyOptions(responseType: ResponseType = "json", body: any): HttpOptionsDeleteWithBody {
        responseType = responseType || "json";
        return {
            responseType,
            body
        };
    }

    private fault(error: any): Observable<string> {
        ApiService.logger.error(`API Error: ${JSON.stringify(error)}`);
        return _throw(`API Error: ${error}`);
    }

    constructor(private http: HttpClient) {}
}

export type ResponseType = "json" | "arraybuffer" | "text" | "blob" | "csv" | "pdf";

export enum RequestTypes {
    TEXT = "text",
    CSV = "csv",
    BLOB = "blob",
    JSON = "json",
    PDF = "pdf",
    EXCEL = "xls",
    XLS = "vnd.ms-excel"
}

interface HttpOptions {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    observe?: "body";
    params?:
        | HttpParams
        | {
              [param: string]: string | string[];
          };
    reportProgress?: boolean;
    responseType?: ResponseType;
    withCredentials?: boolean;
}

interface HttpOptionsDeleteWithBody extends HttpOptions {
    body: any;
}
