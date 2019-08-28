import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    Portfolio,
    PortfolioExposureDataRequest,
    PortfolioInvestmentSummary,
    PortfolioPerformanceChartDataRequest
} from "@core/domain/portfolio.model";
import { ApiEndpointService } from "@core/service/api-endpoint.service";
import { ApiService } from "@core/service/api.service";
import { Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class PortfolioService {
    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioService");

    /**
     * Constructor.
     * @param apiService
     * @param store$
     * @param apiEndpointService
     */
    constructor(private apiService: ApiService, private apiEndpointService: ApiEndpointService, private store$: Store<any>) {
        PortfolioService.logger.debug(`constructor()`);
    }

    public getPortfolio(id: string): Observable<Portfolio> {
        const params = {
            id
        };
        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.PORTFOLIO, params);

        return this.apiService.get(url).pipe(
            map((response) => {
                const data = response.data;
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                PortfolioService.logger.warn(`getPortfolio( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public getPerformanceByMetric(request: PortfolioPerformanceChartDataRequest): Observable<any> {
        const params = {
            id: request.id
        };

        const query = {
            metric_type: request.metric_type,
            as_of_date: request.date
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.PORTFOLIO_COMPANY_PERFORMANCE, params, query);

        return this.apiService.get(url).pipe(
            map((response) => {
                const data = response.data;
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                PortfolioService.logger.warn(`getPerformanceByMetric( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public getExposureByMetric(request: PortfolioExposureDataRequest): Observable<any> {
        const params = {
            id: request.id
        };

        const query = {
            metric_type: request.metric_type,
            as_of_date: request.as_of,
            by: request.by
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.PORTFOLIO_EXPOSURE, params, query);

        return this.apiService.get(url).pipe(
            map((response) => {
                const data = response.data;
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                PortfolioService.logger.warn(`getPerformanceByMetric( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    public getInvestmentSummary(id: string, asOfDate?: string): Observable<PortfolioInvestmentSummary> {
        const params = {
            id
        };
        const query = {
            as_of_date: asOfDate
        };

        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.PORTFOLIO_INVESTMENT_SUMMARY, params, query);

        return this.apiService.get(url).pipe(
            map((response) => {
                const data = response.data;
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                PortfolioService.logger.warn(`getInvestmentSummaryFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }
}
