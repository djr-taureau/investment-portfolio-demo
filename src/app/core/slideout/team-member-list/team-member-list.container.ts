import { Company, Team, TeamMemberGroupTypes, TeamMemberGroup, TeamMember } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { CloseCompanyInfoPanel } from "@core/state/flow/company-flow.actions";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Logger } from "@util/logger";
import { getSelectedCompany, getTeams } from "@app/core/state";
import * as fromTeamActions from "@app/core/state/team/team.actions";
import * as fromTeamMemberActions from "@app/core/state/team-member/team-member.actions";

@Component({
    selector: "sbp-team-member-list-container",
    template: `
        <sbp-team-member-list [company]="company$ | async" [teams]="teams$ | async" (goToDetail)="goToMemberDetail($event)" (closePanel)="onClose()">
        </sbp-team-member-list>
    `
})
export class TeamMemberListContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TeamMemberListContainer");

    /**
     * The Company in context
     */
    public company$: Observable<Company>;

    /**
     * The Team in context
     */
    public teams$: Observable<TeamMemberGroup[]>;

    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        this.store$.dispatch(new CloseCompanyInfoPanel("1"));
    }

    public goToMemberDetail(event: any): void {
        const { member, group, companyId } = event;

        TeamMemberListContainer.logger.debug(`goToMemberDetail() for member ${member.id} ${group.category}`);
        this.store$.dispatch(new fromTeamActions.SetSelectedTeamMemberGroup(group));
        this.store$.dispatch(new fromTeamMemberActions.GetTeamMember({ memberId: member.id, companyId }));
        // this.store$.dispatch(new OpenTeamMemberDetailPanel(member));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.company$ = this.store$.pipe(select(getSelectedCompany));
        this.teams$ = this.store$.pipe(select(getTeams));
    }

    constructor(private store$: Store<any>) {}
}
