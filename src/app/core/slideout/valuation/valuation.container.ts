import { Company, Team, TeamMemberGroupTypes, TeamMemberGroup, TeamMember, Valuation } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { CloseCompanyInfoPanel } from "@core/state/flow/company-flow.actions";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Logger } from "@util/logger";
import { getSelectedCompany, getTeams, getSelectedValuation } from "@app/core/state";
import * as fromTeamActions from "@app/core/state/team/team.actions";
import * as fromTeamMemberActions from "@app/core/state/team-member/team-member.actions";

@Component({
    selector: "sbp-valuation-container",
    template: `
        <sbp-valuation-slideout [company]="company$ | async" [valuation]="valuation$ | async" (closePanel)="onClose()"> </sbp-valuation-slideout>
    `
})
export class ValuationContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ValuationContainer");

    /**
     * The Company in context
     */
    public company$: Observable<Company>;

    /**
     * The Valuation in context
     */
    public valuation$: Observable<Valuation>;

    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        this.store$.dispatch(new CloseCompanyInfoPanel("1"));
    }

    public goToValuationDetail(event: any): void {
        const { member, group, companyId } = event;

        ValuationContainer.logger.debug(`goToValuationDetail() for member ${member.id} ${group.category}`);
        // OUT OF SCOPE FOR MVP
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.company$ = this.store$.pipe(select(getSelectedCompany));
        this.valuation$ = this.store$.pipe(select(getSelectedValuation));
    }

    constructor(private store$: Store<any>) {}
}
