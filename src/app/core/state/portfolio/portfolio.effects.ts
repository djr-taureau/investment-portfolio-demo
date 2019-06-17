import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { PortfolioActions, PortfolioApiActions } from "./actions-index";
import { map, catchError, exhaustMap } from "rxjs/operators";
import { Company } from "@core/domain/company.model";
import { CompanyService } from "@core/service/company.service";

@Injectable()
export class PortfolioEffects {
    @Effect()
    loadPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioActions.loadPortfolio.type),
        exhaustMap(() =>
            this.companyService.getCompanies(false).pipe(
                map((companies: Company[]) => {
                    return PortfolioApiActions.loadCompaniesSuccess({ companies });
                }),
                catchError((error) => of(PortfolioApiActions.loadCompaniesFailure({ error })))
            )
        )
    );

    @Effect()
    loadMockPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioActions.loadMockPortfolio.type),
        exhaustMap(() =>
            this.companyService.getCompanies(true).pipe(
                map((companies: Company[]) => {
                    return PortfolioApiActions.loadMockCompaniesSuccess({ companies });
                }),
                catchError((error) => of(PortfolioApiActions.loadCompaniesFailure({ error })))
            )
        )
    );

    constructor(private actions$: Actions, private companyService: CompanyService) {}
}
