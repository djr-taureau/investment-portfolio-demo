import { Company } from "../../core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { CloseCompanyInfoPanel } from "../../core/state/flow/flow.actions";
import { ToggleSlideout } from "../../core/state/layout/layout.actions";

@Component({
    selector: "sbp-company-info-container",
    template: `
        <sbp-company-info [company]="company$ | async" (closePanel)="onClose()"></sbp-company-info>
    `
})
export class CompanyInfoContainerComponent implements OnInit {
    public company$: Observable<Company>;

    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        this.store$.dispatch(new CloseCompanyInfoPanel(1));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        // GMAN: This should load a company once ready
        // this.company$ = this.store$.pipe()
    }

    constructor(private store$: Store<any>) {}
}
