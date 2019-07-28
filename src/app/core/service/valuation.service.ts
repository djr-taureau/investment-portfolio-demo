import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { ApiEndpointService } from "./api-endpoint.service";
import { Valuation } from "./../domain/company.model";
import { Observable, throwError, of } from "rxjs";
import { Logger } from "./../../util/logger";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ValuationService {
    private static logger: Logger = Logger.getLogger("ValuationService");

    constructor(private apiService: ApiService) {
        ValuationService.logger.debug("constructor()");
    }

    /**
     * Gets the valuations for the company in context
     */
    public getValuations(id: string): Observable<Valuation> {
        ValuationService.logger.debug(`getValuations(${id})`);

        const params = {
            id
        };
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.VALUATION, params);

        return this.apiService.get(url).pipe(
            map((result) => {
                result.data.companyId = id;
                return result.data;
            }),
            catchError((fault: HttpErrorResponse) => {
                ValuationService.logger.warn(`valuationsFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }
}
