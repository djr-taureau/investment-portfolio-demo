import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Company } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import { PortfolioTableItem } from "@app/core/domain/portfolio-table-item.model";

@Component({
    selector: "sbp-portfolio-listing",
    templateUrl: "./portfolio-listing.component.html",
    styleUrls: ["./portfolio-listing.component.scss"]
})
export class PortfolioListingComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingComponent");

    /**
     * List of companies to display.
     */
    @Input()
    public companies: Company[];

    /**
     * Table data.
     */
    @Input()
    public tableData: PortfolioTableItem[];

    /**
     * Table data's group by value.
     */
    @Input()
    public groupBy: string;

    /**
     * TODO: REMOVE: BME: Mock data stream from the Mock API.
     */
    @Input()
    public set mocks(value) {
        this._mocks = JSON.stringify(value);
    }
    public get mocks() {
        return this._mocks;
    }
    private _mocks;

    /**
     * TODO: REMOVE:: BMR: 06/05/2019 Here for demo.
     */
    @Output()
    public loadCompanies: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public openCompanyDashboard: EventEmitter<string> = new EventEmitter<string>();

    /**`
     * Handles the table click of a company row
     */
    public onOpenCompanyDashboard(companyId: string) {
        this.openCompanyDashboard.emit(companyId);
    }
    /**
     * Constructor.
     */
    constructor() {
        PortfolioListingComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingComponent.logger.debug(`ngOnInit()`);
    }

    /**
     * TODO: REMOVE:: BMR: 06/05/2019 Here for demo.
     */
    public onLoadCompanies(event: any): void {
        PortfolioListingComponent.logger.debug(`onLoadCompanies()`);
        this.loadCompanies.emit(event);
    }
}
