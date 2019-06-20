import * as fromCompanyState from "../core/state/";
import { appRoutePaths } from "../app.routes";
import { Company } from "../core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { CorePortfolioContainer } from "../shared/portfolio/core-portfolio.container";
import { Logger } from "../util/logger";
import { Observable, of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { companies } from "./portfolio-listing-table/sample-data";
import { PortfolioTableItem } from "@app/core/domain/portfolio-table-item.model";
import { getPortfolioTableItemDefault, getPortfolioTableItemMock } from "@app/util/test.util";

@Component({
    selector: "sbp-portfolio-listing-container",
    template: `
        <sbp-portfolio-listing [companies]="companies$ | async" [tableData]="tableData$ | async"></sbp-portfolio-listing>
    `
})
export class PortfolioListingContainer extends CorePortfolioContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingContainerComponent");

    /**
     * The list of companies as an observable stream.
     */
    public companies$: Observable<Company[]>;

    /**
     * The list of company type data for table
     */
    public tableData$: Observable<PortfolioTableItem[]>;

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingContainer.logger.debug(`ngOnInit()`);
        // this.companies$ = this.store$.pipe(select(fromCompanyState.getAllCompanies));
        this.companies$ = of(companies);
        this.tableData$ = of([
            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "0",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Damien Lee",
                sectors: ["frontier tech", "real estate"],
                region: "america",
                countryFlag: "assets/image/flag.png",
                country: "USA",
                amountInvested: 5400000000,
                currentValuation: 11000000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "ARM",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "1",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Emily Madison",
                sectors: ["frontier tech"],
                region: "europe",
                countryFlag: "assets/image/flag.png",
                country: "GB",
                amountInvested: 540000000,
                currentValuation: 1100000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "Uber",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "2",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Yan Chang",
                sectors: ["real estate", "frontier tech"],
                region: "asia",
                countryFlag: "assets/image/flag.png",
                country: "Japan",
                amountInvested: 54000000,
                currentValuation: 110000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "Cruise Automation",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "3",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Andrew Alexanderson",
                sectors: ["pharma"],
                region: "asia",
                countryFlag: "",
                country: "INDIA",
                amountInvested: 6400000000,
                currentValuation: 10000000000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "First Cry",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "5",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Lawrence Lampert",
                sectors: ["frontier tech"],
                region: "america",
                countryFlag: "assets/image/flag.png",
                country: "USA",
                amountInvested: 53200000000,
                currentValuation: 54000000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "NVIDIA",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "6",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Damien Lee",
                sectors: ["real estate"],
                region: "europe",
                countryFlag: "assets/image/flag.png",
                country: "France",
                amountInvested: 5400000000,
                currentValuation: 110000000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "WeWork",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "7",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Lawrence Lampert",
                sectors: ["real estate"],
                region: "asia",
                countryFlag: "assets/image/flag.png",
                country: "China",
                amountInvested: 22000000,
                currentValuation: 7600000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "ZhongAn Insurance",
                sectorsAdditional: { value: "", visible: false }
            }),

            getPortfolioTableItemMock({
                logo: "assets/image/slack.png",
                companyId: "8",
                teamLeadAvatar: "assets/image/slack.png",
                teamLeadName: "Emily Madison",
                sectors: ["real estate"],
                region: "america",
                countryFlag: "assets/image/flag.png",
                country: "USA",
                amountInvested: 330000000,
                currentValuation: 900000,
                MOIC: 0.3,
                IRR: 0.1,
                companyName: "Automation Anywhere",
                sectorsAdditional: { value: "", visible: false }
            })
        ]);
        super.ngOnInit();
    }

    /**
     * Constructor.
     * @param store$
     */
    constructor(public store$: Store<any>) {
        super(store$, appRoutePaths.portfolioListing);
    }
}
