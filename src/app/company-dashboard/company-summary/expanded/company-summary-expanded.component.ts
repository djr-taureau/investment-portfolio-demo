import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ChartColor } from "@core/domain/chart-data.model";
import { Company, Tag, Takeaway, TeamMember, ValuationValue } from "@core/domain/company.model";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-company-summary-expanded",
    templateUrl: "./company-summary-expanded.component.html",
    styleUrls: ["./company-summary-expanded.component.scss"]
})
export class CompanySummaryExpandedComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryExpandedComponent");

    /**
     * The Company in context.
     */
    @Input()
    public set company(value: Company) {
        if (value) {
            this._company = value;

            // Create chart data.
            this.percentOwnershipChartData = this.createPercentOwnershipChartData(value);
            this.amountDeployedChartData = this.createAmountDeployedChartData(value);
        }
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

    /**
     * List of team members.
     */
    @Input()
    public teamMembers: TeamMember[] = [];

    /**
     * List of tags.
     */
    @Input()
    public tags: Tag[] = [];

    /**
     * List of takeaways.
     */
    @Input()
    public takeaways: string[] = [];

    /**
     * Current company valuation.
     */
    @Input()
    public currentValuation: ValuationValue = null;

    /**
     * Year plus one company valuation.
     */
    @Input()
    public yearPlusOneValuation: ValuationValue = null;

    /**
     * Exit company valuation.
     */
    @Input()
    public exitValuation: ValuationValue = null;

    /**
     * Request to see all takeaways.
     */
    @Output()
    public seeMoreCompanyInfo: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Request to see all takeaways.
     */
    @Output()
    public seeAllTakeaways: EventEmitter<string> = new EventEmitter<string>();

    /**
     * The percent owned chart data.
     */
    public percentOwnershipChartData: any[] = [];

    /**
     * The amount deployed chart data.
     */
    public amountDeployedChartData: any[] = [];

    /**
     * Constructor.
     */
    constructor() {
        CompanySummaryExpandedComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryExpandedComponent.logger.debug(`ngOnInit()`);
    }

    /**
     * Handles click of see all takeaways.
     * @param id
     */
    public onSeeAllTakeaways(id: string): void {
        CompanySummaryExpandedComponent.logger.debug(`onSeeAllTakeaways( Company ID: ${id} )`);
        this.seeAllTakeaways.emit(id);
    }

    /**
     * Handles click of see more company info.
     * @param id
     */
    public onSeeMoreCompanyInfo(id: string): void {
        CompanySummaryExpandedComponent.logger.debug(`onSeeMoreCompanyInfo( Company ID: ${id} )`);
        this.seeMoreCompanyInfo.emit(id);
    }

    /**
     * Creates the percent ownership chart data.
     * @param company
     */
    private createPercentOwnershipChartData(company: Company): any[] {
        return [
            { value: company.percentOwnership, color: ChartColor.lightNavy },
            { value: 1 - company.percentOwnership, color: ChartColor.lightPeriwinkle }
        ];
    }

    /**
     * Creates the amount deployed chart data.
     * @param company
     */
    private createAmountDeployedChartData(company: Company): any[] {
        return [{ value: company.deployed, color: ChartColor.lightNavy }, { value: company.deployedTotal, color: ChartColor.lightPeriwinkle }];
    }
}
