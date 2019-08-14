import * as CompanyDocumentActions from "@core/state/company/documents/company-documents.actions";
import { CompanyDocument } from "@core/domain/document.model";
import { CompanyDocumentActionTypes } from "@core/state/company/documents/company-documents.actions";
import { Observable, of } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, concatMap } from "rxjs/operators";
import { CompanyService } from "@core/service/company.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CompanyDocumentsEffects {
    @Effect()
    getDocuments$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyDocumentActions.GetAllDocuments>(CompanyDocumentActionTypes.GetAllDocuments),
        map((action) => action.payload),
        exhaustMap((id: string) =>
            this.companyService.getCompanyDocuments(id).pipe(
                map((result: CompanyDocument[]) => {
                    return new CompanyDocumentActions.GetAllDocumentsSuccess(result);
                }),
                catchError((error) => of(new CompanyDocumentActions.GetAllDocumentsFailure(error)))
            )
        )
    );

    /**
     * Constructor.
     * @param actions$
     * @param companyService
     * @param store$
     */
    constructor(private actions$: Actions, private companyService: CompanyService, private store$: Store<any>) {}
}
