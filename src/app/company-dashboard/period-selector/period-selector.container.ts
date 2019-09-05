import { state } from "@angular/animations";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import * as fromRevenue from "@core/state/company/revenue";
import { Component, OnInit } from "@angular/core";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DashboardAsOfDateChanged, DashboardCurrencyChanged, DashboardDatePartChanged } from "@core/state/flow/company-flow.actions";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Observable, of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { SelectorPeriod, HistoricalProjectedResult } from "@app/company-dashboard/period-selector/period-selector.component";

@Component({
    selector: "sbp-period-selector-container",
    template: `
        <sbp-period-selector
            class="period-selector-container"
            [selectedCurrency]="selectedCurrency$ | async"
            [alternateCurrency]="alternateCurrency$ | async"
            [availablePeriods]="availablePeriods$ | async"
            [selectedDatePartType]="selectedDatePartType$ | async"
            [selectedPeriod]="selectedPeriod$ | async"
            [fye]="fye$ | async"
            [showCurrencySelector]="showCurrencySelector$ | async"
            [showDateUnitSelector]="showDateUnitSelector$ | async"
            [historicalProjectedResult]="historicalProjectedResult$ | async"
            (selectedCurrencyChange)="onSelectedCurrencyChange($event)"
            (selectedDatePartChange)="onSelectedDatePartChange($event)"
            (selectedPeriodChange)="onSelectedPeriodChange($event)"
        ></sbp-period-selector>
    `,
    styleUrls: ["./period-selector.container.scss"]
})
export class PeriodSelectorContainer implements OnInit {
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
     * The values to use for the historical and projected labels
     */
    public historicalProjectedResult$: Observable<HistoricalProjectedResult>;

    /**
     * Month of company's financial year end (0-based?)
     */
    public fye$: Observable<string>;

    /**
     * What period is selected for the 'as of' menu
     */
    public selectedPeriod$: Observable<SelectorPeriod>;

    /**
     * Unit representing historical data
     */
    public historicalUnits$: Observable<SelectorPeriod[]>;

    /**
     * Unit representing projected data
     */
    public projectedUnits: Observable<SelectorPeriod[]>;

    /**
     * Determines if the currency selector is visible
     */
    public showCurrencySelector$: Observable<boolean>;

    /**
     * Determines if the date unit part selector is visible
     */
    public showDateUnitSelector$: Observable<boolean> = of(true);

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
        this.selectedPeriod$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedPeriod));
        this.selectedCurrency$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedCurrency));
        this.selectedDatePartType$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedDatePart));
        this.alternateCurrency$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedCompanyAlternateCurrency));
        this.fye$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedCompanyFYE));
        this.availablePeriods$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedCompanyAvailablePeriods));
        this.showCurrencySelector$ = this.store$.pipe(select(fromCompanyDashboardLayout.getShowCurrencySelector));
        this.historicalProjectedResult$ = this.store$.pipe(select(fromRevenue.getHistoricalProjectedResults));
    }
}
