import { CompanyRevenueRequest, GetAllCompanyInitiativesResponse, RevenueSeries } from "@app/core/domain/company.model";
import { CompanyDocument, GetAllCompanyDocumentsResponse } from "@core/domain/document.model";
import { Initiative } from "@core/domain/initiative.model";
import { ApiResponseDataTransformationService } from "@core/service/api-response.data-transformation.service";
import { Observable, throwError } from "rxjs";
import { ApiEndpointService } from "./api-endpoint.service";
import { ApiService } from "./api.service";
import { Company, GetAllCompaniesResponse, GetCompanyResponse } from "@core/domain/company.model";
import { environment } from "../../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "@util/logger";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class CompanyService {
    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyService");

    /**
     * Constructor.
     * @param apiService
     * @param apiEndpointService
     * @param mapper
     */
    constructor(
        private apiService: ApiService,
        private apiEndpointService: ApiEndpointService,
        private mapper: ApiResponseDataTransformationService
    ) {
        CompanyService.logger.debug(`constructor()`);
    }

    /**
     * Retrieves all the companies.
     */
    public getCompanies(): Observable<Company[]> {
        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANIES);
        CompanyService.logger.debug(`getCompanies( ${url} )`);

        return this.apiService.get(url).pipe(
            map((response: GetAllCompaniesResponse) => {
                const data = response.data || [];
                const entities: Company[] = this.mapper.mapEntitiesFromApiToClient(this.mapper.mapCompanyFromApiToClient, data);
                CompanyService.logger.debug(`getCompaniesSuccess( Returning ${entities.length} entities. )`);
                return entities;
            }),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`companiesFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Retrieves all initiatives for a company.
     */
    public getCompanyInitiatives(): Observable<Initiative[]> {
        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANY_INITIATIVES);
        CompanyService.logger.debug(`getCompanyInitiatives( ${url} )`);

        return this.apiService.get(url).pipe(
            map((response: GetAllCompanyInitiativesResponse) => {
                const data = response.data || [];
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getCompanyInitiativesFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Retrieves all initiatives for a company.
     */
    public getCompanyDocuments(id: string): Observable<CompanyDocument[]> {
        const params = {
            id
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANY_DOCUMENTS, params);
        CompanyService.logger.debug(`getCompanyDocuments( ${url} )`);

        return this.apiService.get(url).pipe(
            map((response: GetAllCompanyDocumentsResponse) => {
                const data = response.data || [];
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getCompanyDocumentsFault( ${fault.error.message} )`);
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
        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.COMPANY, params);

        return this.apiService.get(url).pipe(
            map((response: GetCompanyResponse) => {
                const comp = response.data;
                const updated: Company = this.mapper.mapCompanyFromApiToClient(comp);
                return { data: updated } as GetCompanyResponse;
            }),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getCompanyFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Gets the revenue for a given company.
     */
    public getRevenue(request: CompanyRevenueRequest): Observable<RevenueSeries[]> {
        const params = {
            id: request.id
        };
        const query = {
            as_of_date: request.date
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.REVENUE, params, query);
        CompanyService.logger.debug(`getRevenue( ${url} )`);

        return this.apiService.get(url).pipe(
            map((result) => result.data),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getRevenueFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Gets the EBITDA for a given company.
     */
    public getEbitda(request: CompanyRevenueRequest): Observable<RevenueSeries[]> {
        const params = {
            id: request.id
        };
        const query = {
            as_of_date: request.date
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.EBIDTA, params, query);
        CompanyService.logger.debug(`getEbitda( ${url} )`);

        return this.apiService.get(url).pipe(
            map((result) => result.data),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getEbitdaFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Gets the KPI for a given company.
     */
    public getKpi(request: CompanyRevenueRequest): Observable<RevenueSeries[]> {
        const params = {
            id: request.id
        };
        const query = {
            as_of_date: request.date
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.KPI, params, query);
        CompanyService.logger.debug(`getKpi( ${url} )`);

        return this.apiService.get(url).pipe(
            map((result) => result.data),
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`getKpiFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public searchCompanies(query: string): Observable<Company[]> {
        CompanyService.logger.debug(`searchCompanies( query: ${query} )`);
        return this.apiService.get(`${environment.api}?q=${query}`).pipe(map((companies) => companies.items || []));
    }
}
