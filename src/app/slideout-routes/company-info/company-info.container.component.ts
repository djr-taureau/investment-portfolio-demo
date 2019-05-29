import { Company, BoardMember } from "../../core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { CloseCompanyInfoPanel } from "../../core/state/flow/flow.actions";
import { ToggleSlideout } from "../../core/state/layout/layout.actions";
import { Logger } from "app/util/logger";

@Component({
    selector: "sbp-company-info-container",
    template: `
        <sbp-company-info [boardMembers]="boardMembers$ | async" (closePanel)="onClose()"> </sbp-company-info>
    `
})
export class CompanyInfoContainerComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyInfoContainerComponent");

    public boardMembers$: Observable<BoardMember[]>;

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
        this.boardMembers$ = of([
            {
                name: "tim mcgee",
                sinceDate: "May 2018",
                company: "benchmark capital",
                phone: "(510) 123-4567",
                email: "bruce.dunlevle@benchmarkcapital.com",
                avatar: "assets/image/nauset.jpg"
            }
        ]);

        this.boardMembers$.subscribe((data) => CompanyInfoContainerComponent.logger.debug(JSON.stringify(data[0])));
    }

    constructor(private store$: Store<any>) {}
}
