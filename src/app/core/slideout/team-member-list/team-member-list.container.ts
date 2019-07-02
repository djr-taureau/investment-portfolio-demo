import { GoToTeamMemberDetail } from "./../../state/router/router.action";
import { getTeamMock, getMock, getCompanyMock } from "@util/test.util";
import { Company, Team, TeamMemberGroupTypes, TeamMemberGroup } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { CloseCompanyInfoPanel } from "@core/state/flow/flow.actions";
import { Logger } from "@util/logger";
import { getSelectedCompany, getTeams } from "@app/core/state";

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

    public goToMemberDetail(event): void {
        TeamMemberListContainer.logger.debug(`goToMemberDetail() for member ${event}`);
        this.store$.dispatch(new GoToTeamMemberDetail());
        // TODO: will have to update store with currently selected member ID
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.company$ = this.store$.pipe(select(getSelectedCompany));
        this.teams$ = this.store$.pipe(select(getTeams));
        // this.company$ = of(getCompanyMock({ name: "WeWork" }));
        // this.team$ = of(
        //     getTeamMock({
        //         groups: [
        //             {
        //                 category: TeamMemberGroupTypes.DEAL,
        //                 members: [
        //                     {
        //                         id: "0",
        //                         companyName: "",
        //                         firstName: "Damien",
        //                         lastName: "Lee",
        //                         slack: "Damien.Lee",
        //                         avatar: "assets/image/slack.png",
        //                         mobile: "(510) 123-4567",
        //                         email: "damien.lee@softbank.com",
        //                         bio: "",
        //                         companyRelationships: [],
        //                         position: "LEAD"
        //                     },
        //                     {
        //                         id: "1",
        //                         companyName: "",
        //                         firstName: "Emily",
        //                         lastName: "Madison",
        //                         slack: "Emily.madison",
        //                         avatar: "assets/image/slack.png",
        //                         mobile: "(510) 123-4567",
        //                         email: "Emily.madison@softbank.com",
        //                         bio: "",
        //                         companyRelationships: [],
        //                         position: "LEAD"
        //                     },
        //                     {
        //                         id: "2",
        //                         companyName: "",
        //                         firstName: "Terrence",
        //                         lastName: "Sawyer",
        //                         slack: "Terrence.Sawyer",
        //                         avatar: "assets/image/slack.png",
        //                         mobile: "(510) 123-4567",
        //                         email: "Terrence.Sawyer@softbank.com",
        //                         bio: "",
        //                         companyRelationships: [],
        //                         position: ""
        //                     },
        //                     {
        //                         id: "3",
        //                         companyName: "",
        //                         firstName: "lawrence",
        //                         lastName: "lampert",
        //                         slack: "lawrence.lampert",
        //                         avatar: "assets/image/slack.png",
        //                         mobile: "(510) 123-4567",
        //                         email: "lawrence.lampert@softbank.com",
        //                         bio: "",
        //                         companyRelationships: [],
        //                         position: ""
        //                     }
        //                 ]
        //             },
        //             {
        //                 category: TeamMemberGroupTypes.OPS,
        //                 members: [
        //                     {
        //                         id: "0",
        //                         companyName: "",
        //                         firstName: "Ophelia",
        //                         lastName: "Prince",
        //                         slack: "Ophelia.Prince",
        //                         avatar: "assets/image/slack.png",
        //                         mobile: "(510) 123-4567",
        //                         email: "Ophelia.Prince@softbank.com",
        //                         bio: "",
        //                         companyRelationships: [],
        //                         position: "LEAD"
        //                     },
        //                     {
        //                         id: "1",
        //                         companyName: "",
        //                         firstName: "Paul",
        //                         lastName: "Strauss",
        //                         slack: "Paul.Strauss",
        //                         avatar: "assets/image/slack.png",
        //                         mobile: "(510) 123-4567",
        //                         email: "Paul.Strauss@softbank.com",
        //                         bio: "",
        //                         companyRelationships: [],
        //                         position: ""
        //                     }
        //                 ]
        //             }
        //         ]
        //     })
        // );
    }

    constructor(private store$: Store<any>) {}
}
