import { Company } from "../../core/domain/company.model";
import * as AuthActions from "../../core/state/auth/auth.action";
import * as fromState from "../../core/state";
import { CloseCompanyInfoPanel, OpenCompanyInfoPanel, SelectCompany } from "../../core/state/flow/flow.actions";
import * as TestUti from "../../util/test.util";

import { Component, OnInit } from "@angular/core";
import { getShowCompanyCombo } from "../../core/state";
import { Logger } from "../../util/logger";
import { Observable, of } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-header-container",
    template: `
        <sbp-header
            [companies]="companies$ | async"
            [slideoutOpen]="slideoutOpen$ | async"
            [selectedCompany]="selectedCompany$ | async"
            [showCompanyCombo]="showCompanyCombo$ | async"
            (login)="login($event)"
            (logout)="logout($event)"
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
     * The selected company observable.
     */
    public selectedCompany$: Observable<Company>;

    /**
     * Boolean indicating of the slide open is open.
     */
    public slideoutOpen$: Observable<boolean>;

    /**
     * Boolean indicating of the company drop down combo should be visible
     */
    public showCompanyCombo$: Observable<boolean>;

    /**
     * Tests opening the Company Info panel
     * @param $event
     */
    public toggleSlideout(slideOut: boolean): void {
        slideOut ? this.store$.dispatch(new OpenCompanyInfoPanel("1")) : this.store$.dispatch(new CloseCompanyInfoPanel("1"));
    }

    /**
     * Dispatch action to select role in store.
     */
    public selectCompany(event: string) {
        HeaderContainer.logger.debug(`onCompanySelect( ${event} )`);
        this.store$.dispatch(new SelectCompany(event));
    }

    /**
     * Dispatch action to login.
     */
    public login(event: any) {
        HeaderContainer.logger.debug(`login()`);
        this.store$.dispatch(new AuthActions.Login());
    }

    /**
     * Dispatch action to logout.
     */
    public logout(event: any) {
        HeaderContainer.logger.debug(`logout()`);
        this.store$.dispatch(new AuthActions.Logout());
    }

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
        this.showCompanyCombo$ = this.store$.pipe(select(getShowCompanyCombo));
        this.companies$ = of([
            TestUti.getCompanyMock({ name: "Foo, Inc." }),
            TestUti.getCompanyMock({ name: "Bar, LLC." }),
            TestUti.getCompanyMock({ name: "Dogs and Cats" })
        ]);
        this.slideoutOpen$ = this.store$.pipe(select(fromState.getShowSlideout));
    }
}
