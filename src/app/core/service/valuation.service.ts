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

        const mock: Valuation = {
            companyId: id,
            topLineValuations: {
                current: {
                    irr: 10,
                    moic: 6.74,
                    totalValue: 5390000000
                },
                exit: {
                    irr: 0.385,
                    moic: 0.98,
                    totalValue: 780000000
                },
                yearPlus1: {
                    irr: 0.385,
                    moic: 1.1,
                    totalValue: 880000000
                }
            },
            valuationDetail: {
                icInitial: {
                    reportingPeriod: "2019-07-02",
                    approved: 11000000,
                    companyEquityValue: 110,
                    id: "6",
                    invested: 800000000,
                    irr: 10,
                    moic: 6.74,
                    name: "IC INITIAL",
                    ownership: 10,
                    realizedValue: 390000000,
                    scenarioTypeID: 1,
                    sequence: 0,
                    totalValue: 5390000000,
                    unrealizedValue: 5000000000
                },
                icFollowOn1: {
                    reportingPeriod: "2019-07-02",
                    approved: 11000000,
                    companyEquityValue: 110,
                    id: "6",
                    invested: 800000000,
                    irr: 10,
                    moic: 6.74,
                    name: "IC Follow On_1",
                    ownership: 10,
                    realizedValue: 390000000,
                    scenarioTypeID: 2,
                    sequence: 1,
                    totalValue: 5390000000,
                    unrealizedValue: 5000000000
                },
                actuals: {
                    reportingPeriod: "2018-07-02",
                    approved: 500000000,
                    companyEquityValue: 70,
                    id: "6",
                    invested: 400000000,
                    irr: 0,
                    moic: 1,
                    name: "ACTUALS",
                    ownership: 10,
                    realizedValue: 300000000,
                    scenarioTypeID: 12,
                    sequence: 11,
                    totalValue: 800000000,
                    unrealizedValue: 60000000
                },
                yearPlus1: {
                    reportingPeriod: "2019-07-02",
                    approved: 900000000,
                    companyEquityValue: 110,
                    id: "6",
                    invested: 800000000,
                    irr: 0.385,
                    moic: 1.1,
                    name: "+1 YEAR",
                    ownership: 10,
                    realizedValue: 780000000,
                    scenarioTypeID: 13,
                    sequence: 12,
                    totalValue: 880000000,
                    unrealizedValue: 100000000
                },
                exit: {
                    reportingPeriod: "2019-07-03",
                    approved: 900000000,
                    companyEquityValue: 110,
                    id: "6",
                    invested: 800000000,
                    irr: 0.385,
                    moic: 0.98,
                    name: "EXIT",
                    ownership: 10,
                    realizedValue: 780000000,
                    scenarioTypeID: 14,
                    sequence: 13,
                    totalValue: 780000000,
                    unrealizedValue: 0
                }
            }
        };

        // return this.apiService.get(url).pipe(
        //     map((result) => {
        //         result.data.companyId = id;
        //         return result.data;
        //     }),
        //     catchError((fault: HttpErrorResponse) => {
        //         ValuationService.logger.warn(`valuationsFault( ${fault.error.message} )`);
        //         return throwError(fault);
        //     })
        // );
        return of(mock);
    }
}
