import { getSelectedCompany, getSelectedTeamMemberAndRelatedCompanies, getSelectedTeamGroup } from "@core/state";
import { Company, TeamMember, TeamMemberGroup } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { CloseCompanyInfoPanel, OpenTeamMemberListPanel } from "@core/state/flow/flow.actions";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-team-member-detail-container",
    template: `
        <sbp-team-member-detail
            [company]="company$ | async"
            [teamGroup]="teamMemberGroup$ | async"
            [member]="teamMember$ | async"
            (closePanel)="onClose()"
            (goToList)="goToList($event)"
        ></sbp-team-member-detail>
    `
})
export class TeamMemberDetailContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TeamMemberDetailContainer");

    // Inputs: member, companiesCovered, boardMembers, teamGroup, company
    /**
     * The Company, TeamMember, and TeamMemberGroup in context
     */
    public company$: Observable<Company>;
    public teamMember$: Observable<TeamMember>;
    public teamMemberGroup$: Observable<TeamMemberGroup>;

    /**
     * Component props
     */
    public boardSeats: Company[];
    public companiesCovered: Company[];

    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        this.store$.dispatch(new CloseCompanyInfoPanel("1"));
    }

    public goToList(companyId: string): void {
        this.store$.dispatch(new CloseCompanyInfoPanel("1"));
        this.store$.dispatch(new OpenTeamMemberListPanel(companyId));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.company$ = this.store$.pipe(select(getSelectedCompany));
        this.teamMember$ = this.store$.pipe(select(getSelectedTeamMemberAndRelatedCompanies));
        this.teamMemberGroup$ = this.store$.pipe(select(getSelectedTeamGroup));
    }

    constructor(private store$: Store<any>) {}
}
