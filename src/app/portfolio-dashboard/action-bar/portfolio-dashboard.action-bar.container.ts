import { Component, OnInit } from "@angular/core";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DashboardAsOfDateChanged, DashboardCurrencyChanged, DashboardDatePartChanged } from "@core/state/flow/company-flow.actions";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Observable, of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard";

@Component({
    selector: "sbp-portfolio-dashboard-action-bar-container",
    template: `
        <sbp-portfolio-dashboard-action-bar
            class="period-selector-container"
            [selectedCurrency]="selectedCurrency$ | async"
            [alternateCurrency]="alternateCurrency$ | async"
            [availablePeriods]="availablePeriods$ | async"
            [selectedDatePartType]="selectedDatePartType$ | async"
            [selectedPeriod]="selectedPeriod$ | async"
            [showCurrencySelector]="false"
            [showDateUnitSelector]="showDateUnitSelector$ | async"
            [showProjectedResults]="showProjectedResults$ | async"
            [showHistoricalResults]="showHistoricalResults$ | async"
            (selectedCurrencyChange)="onSelectedCurrencyChange($event)"
            (selectedDatePartChange)="onSelectedDatePartChange($event)"
            (selectedPeriodChange)="onSelectedPeriodChange($event)"
        >
        </sbp-portfolio-dashboard-action-bar>
    `,
    styleUrls: ["./portfolio-dashboard.action-bar.container.scss"]
})
export class PortfolioDashboardActionBarContainer implements OnInit {
    /**
     * The currency that is selected (should default to USD)
     */
    public selectedCurrency$: Observable<CurrencyType>;

    /**
     * If present, the currency of the data, based on the currency in the corporations HQ location
     */
    // TODO: GMAN - update to point at company property once known
    public alternateCurrency$: Observable<CurrencyType>;

    /**
     * The date part type selected for viewing (ie. quarter or year)
     */
    public selectedDatePartType$: Observable<DatePartType>;

    /**
     * What periods are available to serve as the 'as of'
     */
    public availablePeriods$: Observable<SelectorPeriod[]>;

    /**
     * Month of company's financial year end (0-based?)
     */
    public fye$: Observable<string>;

    /**
     * What period is selected for the 'as of' menu.
     */
    public selectedPeriod$: Observable<SelectorPeriod>;

    /**
     * Unit representing historical data.
     */
    public historicalUnits$: Observable<SelectorPeriod[]>;

    /**
     * Unit representing projected data.
     */
    public projectedUnits: Observable<SelectorPeriod[]>;

    /**
     * Determines if the currency selector is visible.
     */
    public showCurrencySelector$: Observable<boolean>;

    /**
     * Determines if the date unit part selector is visible
     */
    public showDateUnitSelector$: Observable<boolean>;

    /**
     * Determines if the historical results are visible.
     */
    public showHistoricalResults$: Observable<boolean>;

    /**
     * Determines if the projected results are visible.
     */
    public showProjectedResults$: Observable<boolean>;

    // -----------------------------------------------
    // OUTPUTS
    // -----------------------------------------------
    /**
     * Handles changing the selected currency type
     * @param event
     */
    public onSelectedCurrencyChange(event: CurrencyType) {
        this.store$.dispatch(new DashboardCurrencyChanged(event));
    }

    /**
     * Handles changing the selected period
     * @param event
     */
    public onSelectedPeriodChange(event: SelectorPeriod) {
        this.store$.dispatch(new DashboardAsOfDateChanged(event));
    }

    /**
     * Handles changes to the selected date part
     * @param event
     */
    public onSelectedDatePartChange(event: DatePartType) {
        this.store$.dispatch(new DashboardDatePartChanged(event));
    }

    constructor(protected store$: Store<any>) {}

    public ngOnInit(): void {
        // TODO: BMR: These will be implemented in a followup PR once we know more about the data.
        // this.selectedPeriod$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedPeriod));
        // this.selectedCurrency$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedCurrency));
        // this.selectedDatePartType$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedDatePart));
        // this.alternateCurrency$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedCompanyAlternateCurrency));
        // this.fye$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedCompanyFYE));
        // this.availablePeriods$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedCompanyAvailablePeriods));
        this.showCurrencySelector$ = this.store$.pipe(select(fromPortfolioDashboard.getDisplayCurrencySelector));
        this.showDateUnitSelector$ = this.store$.pipe(select(fromPortfolioDashboard.getDisplayDateUnitSelector));
        this.showHistoricalResults$ = this.store$.pipe(select(fromPortfolioDashboard.getDisplayHistoricalResults));
        this.showProjectedResults$ = this.store$.pipe(select(fromPortfolioDashboard.getDisplayProjectedResults));
    }
}
