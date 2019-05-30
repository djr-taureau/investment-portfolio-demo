import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, defer, of } from "rxjs";
import { PortfolioActions, PortfolioApiActions } from "./actions-index";
import { map, catchError, exhaustMap } from "rxjs/operators";
import { Company } from "../../domain/company.model";
import { CompanyService } from "../../service/company.service";

@Injectable()
export class PortfolioEffects {
    @Effect()
    loadCollection$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioActions.loadPortfolio.type),
        exhaustMap(() =>
            this.companyService.getCompanies().pipe(
                map((companies: Company[]) => {
                    return PortfolioApiActions.loadCompaniesSuccess({ companies });
                }),
                catchError((error) => of(PortfolioApiActions.loadCompaniesFailure({ error })))
            )
        )
    );

    constructor(private actions$: Actions, private companyService: CompanyService) {}
}
