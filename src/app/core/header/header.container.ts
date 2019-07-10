import * as AuthActions from "@core/state/auth/auth.action";
import * as fromState from "@core/state";
import { CloseCompanyInfoPanel, OpenCompanyInfoPanel, SelectCompany } from "@core/state/flow/company-flow.actions";
import { Company } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { getShowCompanyCombo } from "@core/state";
import { GoToPortfolio } from "@core/state/flow/portfolio-flow.actions";
import { Logger } from "@util/logger";
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
            (portfolioClick)="portfolioClick()"
        >
        </sbp-header>
    `
})
export class HeaderContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("HeaderContainer");

    // TODO: TJM DON"T REMOVRE
    // (toggleTeamSlideout)="toggleTeamSlideout($event)"
    // (toggleTeamListSlideout)="toggleTeamListSlideout($event)"
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

    public portfolioClick(): void {
        this.store$.dispatch(new GoToPortfolio());
    }
    /**
     * Dispatch action to select role in store.
     */
    public selectCompany(event: string | number) {
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

        this.companies$ = this.store$.pipe(select(fromState.getAllCompanies));
        this.selectedCompany$ = this.store$.pipe(select(fromState.getSelectedCompany));
        this.showCompanyCombo$ = this.store$.pipe(select(getShowCompanyCombo));
        this.slideoutOpen$ = this.store$.pipe(select(fromState.getShowSlideout));
    }
}
