import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company } from "../../core/domain/company.model";
import { Logger } from "../../util/logger";
import { OpenCompanyInfoPanel } from "../../core/state/flow/flow.actions";
import * as TestUti from "../../util/test.util";
import * as fromState from "../../core/state";

@Component({
    selector: "sbp-header-container",
    template: `
        <sbp-header
            [companies]="companies$ | async"
            [teamMembers]="teamMembers$ | async"
            [slideoutOpen]="slideoutOpen$ | async"
            [selectedCompany]="selectedCompany$ | async"
            (selectCompany)="selectCompany($event)"
            (toggleSlideout)="toggleSlideout($event)"
        >
        </sbp-header>
    `
})
export class HeaderContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("HeaderContainer");

    /**
     * The companies observable.
     */
    public companies$: Observable<Company[]>;

    /**
     * The teamMembers observable.
     */
    public teamMembers$: Observable<Company[]>;

    /**
     * The selected company observable.
     */
    public selectedCompany$: Observable<Company>;

    /**
     * Boolean indicating of the slide open is open.
     */
    public slideoutOpen$: Observable<boolean>;

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>) {
        HeaderContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        HeaderContainer.logger.debug(`ngOnInit()`);

        // TODO: BMR: 05/23/2019: Integrate with Dave's company NGRX.
        // this.companies$ = this.store$.pipe(select(fromState.selectAllRoles));
        this.selectedCompany$ = of(TestUti.getCompanyMock({ name: "Foo, Inc." }));
        this.companies$ = of([
            TestUti.getCompanyMock({ name: "Foo, Inc." }),
            TestUti.getCompanyMock({ name: "Bar, LLC." }),
            TestUti.getCompanyMock({ name: "Dogs and Cats" })
        ]);

        this.teamMembers$ = of([
            TestUti.getMock(TestUti.getTeamMemberDefault, { name: "Tom Brady" }),
            TestUti.getMock(TestUti.getTeamMemberDefault, { name: "Julian Edleman" }),
            TestUti.getMock(TestUti.getTeamMemberDefault, { name: "Rob Gronkowski" })
        ]);

        this.slideoutOpen$ = this.store$.pipe(select(fromState.getShowSlideout));
    }

    /**
     * Tests opening the Company Info panel
     * @param $event
     */
    public toggleSlideout($event: boolean): void {
        this.store$.dispatch(new OpenCompanyInfoPanel(1));
    }

    /**
     * Dispatch action to select role in store.
     */
    public selectCompany(event: Company) {
        HeaderContainer.logger.debug(`onCompanySelect( ${event.name} )`);

        // TODO: BMR: 05/23/2019: Integrate with Dave's company NGRX.
        // this.store$.dispatch(new RegisterLayoutActions.SelectCompany(event.name));
        this.selectedCompany$ = of(event);
    }
}
