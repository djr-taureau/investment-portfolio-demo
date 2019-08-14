import { Component, OnInit } from "@angular/core";
import { CompanyDocument } from "@core/domain/document.model";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromCompanyDashboard from "@core/state/company/dashboard";

@Component({
    selector: "sbp-company-documents-table-container",
    template: `
        <sbp-company-documents-table [documents]="documents$ | async"></sbp-company-documents-table>
    `,
    styleUrls: ["./company-documents-table.container.scss"]
})
export class CompanyDocumentsTableContainer implements OnInit {
    public documents$: Observable<CompanyDocument[]>;

    public ngOnInit(): void {
        this.documents$ = this.store$.pipe(select(fromCompanyDashboard.getAllDocuments));
    }

    constructor(private store$: Store<any>) {}
}
