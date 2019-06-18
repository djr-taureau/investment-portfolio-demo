import { ApiEndpointService } from "./api-endpoint.service";
import { ApiService } from "./api.service";
import { Company, GetAllCompaniesResponse } from "../domain/company.model";
import { environment } from "../../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "../../util/logger";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";

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
    constructor(private store$: Store<any>, private apiService: ApiService) {
        CompanyService.logger.debug(`constructor()`);
    }

    /**
     * Retrieves all the companies
     */
    public getCompanies(isMock: boolean = false): Observable<GetAllCompaniesResponse> {
        CompanyService.logger.debug(`getCompanies( isMock: ${isMock} )`);

        const url = isMock
            ? ApiEndpointService.getEndpoint(ApiEndpointService.MOCK_ENDPOINT.COMPANIES)
            : ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANIES);

        return this.apiService.get(url).pipe(
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`companiesFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public searchCompanies(query: string): Observable<Company[]> {
        CompanyService.logger.debug(`searchCompanies( query: ${query} )`);
        return this.apiService.get(`${environment.api}?q=${query}`).pipe(map((companies) => companies.items || []));
    }
}
