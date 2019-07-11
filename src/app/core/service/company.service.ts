import { ApiEndpointService } from "./api-endpoint.service";
import { ApiService } from "./api.service";
import { Company, GetAllCompaniesResponse, GetCompanyResponse } from "@core/domain/company.model";
import { environment } from "../../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "@util/logger";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import * as _ from "lodash";

@Injectable()
export class CompanyService {
    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyService");

    /**
     * Constructor.
     * @param apiService
     */
    constructor(private apiService: ApiService) {
        CompanyService.logger.debug(`constructor()`);
    }

    /**
     * Retrieves all the companies.
     */
    public getCompanies(): Observable<Company[]> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANIES);
        CompanyService.logger.debug(`getCompanies( ${url} )`);

        return this.apiService.get(url).pipe(
            map((response: GetAllCompaniesResponse) => {
                const data = response.data || [];
                CompanyService.logger.debug(`getCompaniesSuccess( Returning ${data.length} entities. )`);
                const companies: Company[] = data.map((item) => {
                    return {
                        ...item,
                        id: String(item.id)
                    };
                });

                // NOTE: At times the API was passing back duplicates so we'll give them a hand and remove them.
                return _.uniqBy(companies, "id");
            }),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`companiesFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Retrieves the company entity by ID.
     */
    public getCompany(id: string): Observable<GetCompanyResponse> {
        CompanyService.logger.debug(`getCompany( ID: ${id} )`);

        const params = {
            id
        };
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANY, params);

        return this.apiService.get(url).pipe(
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getCompanyFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public searchCompanies(query: string): Observable<Company[]> {
        CompanyService.logger.debug(`searchCompanies( query: ${query} )`);
        return this.apiService.get(`${environment.api}?q=${query}`).pipe(map((companies) => companies.items || []));
    }
}
