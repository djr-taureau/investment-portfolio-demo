import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AvailablePeriod } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { ChartUnit } from "@util/chart-data.util";
import { Logger } from "@util/logger";
import * as _ from "lodash";

/**
 * Interface for the period selector items
 */
export interface SelectorPeriod extends AvailablePeriod {
    id: number;
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
    public alternateCurrency: CurrencyType;

    /**
     * Which date unit has the user selected - quarter or year?
     */
    @Input()
    public selectedDatePartType: DatePartType = DatePartTypeEnum.QTR;

    /**
     * The periods available for the selector
     */
    @Input()
    public availablePeriods: SelectorPeriod[];

    /**
     * The 'as of' period (the selected period in the available periods)
     */
    @Input()
    public selectedPeriod: SelectorPeriod;

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
     * The units that represent the historical Units
     */
    @Input()
    public historicalUnits: ChartUnit[] = [
        // TODO: GMAN: Remove in future integration effort
        {
            date: new Date(),
            quarter: 3,
            id: String(new Date().getTime()),
            text: "FQ3 2019",
            icon: ""
        }
    ];

    /**
     * The units that represent the projected Unit
     */
    @Input()
    public projectedUnits: ChartUnit[];

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
    // PUBLIC FUNCTIONS
    // -----------------------------------------------
    public getHistoricalUnitCount(): number {
        return _.get(this, "historicalUnits", []).length;
    }

    public getFirstHistoricalUnit(): Date {
        return _.get(_.head(this.historicalUnits), "date", new Date());
    }

    public getLastHistoricalUnit(): Date {
        return _.get(_.last(this.historicalUnits), "date", new Date());
    }

    public getProjectedUnitCount() {
        return _.get(this, "projectedUnits", []).length;
    }

    public getFirstProjectedUnit(): Date {
        return _.get(_.head(this.projectedUnits), "date", new Date());
    }

    public getLastProjectedUnit(): Date {
        return _.get(_.last(this.projectedUnits), "date", new Date());
    }

    public getAltCurrencyName() {
        return _.get(this.alternateCurrency, "name", "");
    }

    public getAltCurrencySymbol() {
        return _.get(this.alternateCurrency, "symbol", "");
    }

    public getSelectedDatePartName() {
        return _.get(this.selectedDatePartType, "name", "") + "s";
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
        this.selectedDatePartChange.emit($event);
    }

    /**
     * Handles changes to the selected period ("as of")
     * @param $event
     */
    public onPeriodChange($event: IconizedItem) {
        this.logger.debug(`onPeriodChange(${event})`);
        // this.selectedPeriodChange.emit($event);
    }

    // -----------------------------------------------
    // LIFECYCLE
    // -----------------------------------------------
    public ngOnInit(): void {}

    constructor() {}
}
