import { Injectable } from "@angular/core";
import { Company } from "../domain/company.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Logger } from "../../util/logger";
import { ApiEndpointService } from "./api-endpoint.service";

@Injectable()
export class CompanyService {
    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyService");

    /**
     * Constructor.
     * @param http
     */
    constructor(private http: HttpClient) {
        CompanyService.logger.debug(`constructor()`);
    }

    /**
     * Retrieves all the companies
     */
    public getCompanies(isMock: boolean = false): Observable<Company[]> {
        CompanyService.logger.debug(`getCompanies( isMock: ${isMock} )`);

        const url = isMock
            ? "https://prism-dev-api-management.azure-api.net/sbdevapi5/v2/companies"
            : ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANIES);

        return this.http.get<Company[]>(url).pipe(
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`companiesFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public searchCompanies(query: string): Observable<Company[]> {
        CompanyService.logger.debug(`searchCompanies( query: ${query} )`);
        return this.http.get<{ items: Company[] }>(`${environment.api}?q=${query}`).pipe(map((companies) => companies.items || []));
    }
}
