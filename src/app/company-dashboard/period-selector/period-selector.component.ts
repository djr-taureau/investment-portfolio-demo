import { getSelectedDatePart } from "./../../core/state/company/dashboard/company-dashboard-layout.reducer";
import { AvailablePeriod } from "@core/domain/company.model";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as _ from "lodash";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { Logger } from "@util/logger";

/**
 * Interface for the period selector items
 */
export interface SelectorPeriod extends AvailablePeriod {
    quarterLabel?: string;
    yearLabel?: string;
    id: number;
    fiscalDate?: string;
}

export interface HistoricalProjectedResult {
    historicalCount: number;
    historicalStart: string;
    historicalEnd: string;
    projectedCount: number;
    projectedStart: string;
    projectedEnd: string;
}

@Component({
    selector: "sbp-period-selector",
    templateUrl: "./period-selector.component.html",
    styleUrls: ["./period-selector.component.scss"]
})
export class PeriodSelectorComponent implements OnInit {
    // -----------------------------------------------
    // PRIVATE
    // -----------------------------------------------
    private logger: Logger = Logger.getLogger("PeriodSelectorComponent");

    private _availablePeriods: SelectorPeriod[];

    private _availablePeriodsByYear: SelectorPeriod[];

    // -----------------------------------------------
    // INPUTS
    // -----------------------------------------------

    /**
     * The currency the user has selected
     */
    @Input()
    public selectedCurrency: CurrencyType;

    /**
     * The alternative, non-USD currency that the user can select (if available)
     */
    @Input()
    set alternateCurrency(value: CurrencyType) {
        if (value) {
            this._alternateCurrency = value;
            this.showAlternateCurrency = value.currencyCode !== null;
        }
    }
    get alternateCurrency() {
        return this._alternateCurrency;
    }
    private _alternateCurrency: CurrencyType;
    public showAlternateCurrency = false;

    /**
     * Which date unit has the user selected - quarter or year?
     */
    @Input()
    set selectedDatePartType(value: DatePartType) {
        if (value) {
            this._selectedDatePartType = value;
        }
    }
    get selectedDatePartType(): DatePartType {
        return this._selectedDatePartType;
    }
    private _selectedDatePartType: DatePartType = DatePartTypeEnum.QTR;

    /**
     * The periods available for the selector
     */
    @Input()
    public set availablePeriods(value: SelectorPeriod[]) {
        this._availablePeriods = value;
        this._availablePeriodsByYear = [];
        const groupedByYear = _.groupBy(value, (p) => {
            return new Date(p.date).getFullYear();
        });
        _.each(groupedByYear, (yearItems) => {
            const lastItem = _.last(yearItems);
            const updatedLastItem = _.extend(lastItem, {
                id: "FY " + new Date(lastItem.date).getFullYear()
            });
            this._availablePeriodsByYear.push(updatedLastItem);
        });
        this._availablePeriodsByYear.reverse();
    }

    /**
     * The 'as of' period (the selected period in the available periods)
     */
    @Input()
    set selectedPeriod(value: SelectorPeriod) {
        if (value) {
            this._selectedPeriod = value;
        }
    }
    get selectedPeriod(): SelectorPeriod {
        return this._selectedPeriod;
    }
    private _selectedPeriod: SelectorPeriod = null;

    /**
     * The month of the financial year end
     */
    @Input()
    public fye: string;

    /**
     * Period selector popup settings
     */
    @Input()
    public popupSettings = { width: 200 };

    /**
     * Determines if the currency selector is visible
     */
    @Input()
    public showCurrencySelector = true;

    /**
     * Determines if the date unit part selector is visible
     */
    @Input()
    public showDateUnitSelector = true;

    /**
     * Provides values to use for historical and projected results
     */
    @Input()
    set historicalProjectedResult(value: HistoricalProjectedResult) {
        if (value) {
            this.historicalCount = value.historicalCount;
            this.historicalStart = value.historicalStart;
            this.historicalEnd = value.historicalEnd;
            this.projectedCount = value.projectedCount;
            this.projectedStart = value.projectedStart;
            this.projectedEnd = value.projectedEnd;
        }
    }
    public historicalCount = 0;
    public historicalStart = "";
    public historicalEnd = "";
    public projectedCount = 0;
    public projectedStart = "";
    public projectedEnd = "";

    // -----------------------------------------------
    // PUBLIC
    // -----------------------------------------------
    /**
     * Handle to the currency enums
     */
    public currencies = CurrencyTypeEnum;

    public dateunits = DatePartTypeEnum;

    // -----------------------------------------------
    // OUTPUTS
    // -----------------------------------------------

    /**
     * Emits when the selected currency changes
     */
    @Output()
    public selectedCurrencyChange: EventEmitter<CurrencyType> = new EventEmitter<CurrencyType>();

    /**
     * Emits when the selected "as of" period changes
     */
    @Output()
    public selectedPeriodChange: EventEmitter<SelectorPeriod> = new EventEmitter<SelectorPeriod>();

    /**
     * Emits when the selected date part unit changes
     */
    @Output()
    public selectedDatePartChange: EventEmitter<DatePartType> = new EventEmitter<DatePartType>();
    // -----------------------------------------------
    // PRIVATE FUNCTIONS
    // -----------------------------------------------

    private getHistoricalUnits(): SelectorPeriod[] {
        return _.filter(_.get(this, "availablePeriods", []), (period) => {
            // return new Date(period.date) <= new Date();
            return !period.isProjection;
        });
    }

    private getProjectedUnits(): SelectorPeriod[] {
        return _.filter(_.get(this, "availablePeriods", []), (period) => {
            // return new Date(period.date) >= new Date();
            return period.isProjection;
        });
    }
    // -----------------------------------------------
    // PUBLIC FUNCTIONS
    // -----------------------------------------------
    public getPeriods() {
        return this.selectedDatePartType === DatePartTypeEnum.QTR ? this._availablePeriods : this._availablePeriodsByYear;
    }

    public getPeriodIdField() {
        return this.selectedDatePartType === DatePartTypeEnum.QTR ? "quarterLabel" : "yearLabel";
    }

    public getAltCurrencyName() {
        return _.get(this.alternateCurrency, "currencyCode", "");
    }

    public getAltCurrencySymbol() {
        return _.get(this.alternateCurrency, "currencySymbol", "");
    }

    public getSelectedDatePartNameHistorical() {
        const result = _.get(this.selectedDatePartType, "name", "");
        return this.historicalCount > 1 ? result.concat("s") : result;
    }

    public getSelectedDatePartNameProjected() {
        const result = _.get(this.selectedDatePartType, "name", "");
        return this.projectedCount > 1 ? result.concat("s") : result;
    }

    /**
     * Determines if the alternate currency is selected
     */
    public getAlternateCurrencySelected(): boolean {
        return _.get(this, "selectedCurrency.currencyCode", null) === _.get(this, "alternateCurrency.currencyCode", "none");
    }

    /**
     * Determines if the alternate currency is selected
     */
    public getDefaultCurrencySelected(): boolean {
        return _.get(this, "selectedCurrency.currencyCode", null) === _.get(this, "defaultCurrency.currencyCode", "none");
    }
    /**
     * Handles changes to the selected currency
     * @param $event
     */
    public onCurrencyChange($event: CurrencyType) {
        this.logger.debug(`onCurrencyChange(${event})`);
        this.selectedCurrencyChange.emit($event);
    }

    /**
     * Handles changes to the selected currency
     * @param $event
     */
    public onDatePartChange($event: DatePartType) {
        this.logger.debug(`onDatePartChange(${event})`);

        // GMAN: It seems that if this is going to QTR -> YEAR, that the quarter of the selected period should always be changed the LAST one in the
        // matching year so that when the chart data changes to year, it contains ALL the year data (since the selectedPeriod should be the "from" in
        // filtering API responses, et al. Without this, the user could see a label that indicates they are looking at FY 200X but be seeing only a
        // portion of that data.
        // Example: The user chooses to view by QTR and choose "FQ2 2016", then changes to "FY 2016"... we can't just change the display, we also need
        // to set the selectedPeriod (which are always quarters) to "FQ$ 2016", otherwise the charts would only have FQ2 2016 and FQ1 2016

        // if ($event === DatePartTypeEnum.YEAR) {
        //     const selectedYear = new Date(this.selectedPeriod.date).getFullYear();
        //     const selectedYearQuarters = _.orderBy(
        //         _.filter(this._availablePeriods, (period) => new Date(period.date).getFullYear() === selectedYear),
        //         "financialQuarter"
        //     );

        //     this.selectedPeriodChange.emit(_.last(selectedYearQuarters));
        // }
        this.selectedDatePartChange.emit($event);
    }

    /**
     * Handles changes to the selected period ("as of")
     * @param $event
     */
    public onPeriodChange($event: SelectorPeriod) {
        this.logger.debug(`onPeriodChange(${event})`);
        this.selectedPeriodChange.emit($event);
    }

    // -----------------------------------------------
    // LIFECYCLE
    // -----------------------------------------------
    public ngOnInit(): void {}

    constructor() {}
}
