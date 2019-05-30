import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as _ from "lodash";

import { Company, BoardMember } from "../../core/domain/company.model";
import { Logger } from "app/util/logger";

@Component({
    selector: "sbp-company-info",
    templateUrl: "./company-info.component.html",
    styleUrls: ["./company-info.component.scss"]
})
export class CompanyInfoComponent {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyInfoComponent");

    @Input()
    public boardMembers: BoardMember[];

    // @Input()
    public company: any = {
        description: `WeWork Platform for creators that transforms buildings into dynamic environments \n
                        for creativity, focus, and collaboration`,
        tags: [{ name: "private" }, { name: "real estate" }, { name: "coworking" }, { name: "hospitality" }],
        slackName: "wasitim",
        percentOwnership: ".122",
        aka: "The We Company",
        headquarters: "New York, New York, USA",
        foundedDate: "2010",
        founders: ["Adam Neumann", "Miguel McKelvey"],
        website: "www.wework.com",
        sector: [{ name: "Real Estate" }, { name: "Coworking" }, { name: "Hospitality" }],
        stage: "Private",
        fiscalYearEnd: "Dec 31",
        investingEntity: "SVF",
        initialInvestmentDate: "Nov 2018",
        latestFollowOnDate: "Jun 2018",
        FDOwnership: "12.2%"
    };

    @Output()
    public closePanel: EventEmitter<any> = new EventEmitter();

    public getCompanyName(): string {
        return _.get(this.company, "name", "We Work");
    }

    public getSectorList(): string {
        // return this.company.sector.join(', ');
        return this.company.sector
            .map((item) => {
                return item.name;
            })
            .join(", ");
    }

    public getChartData() {
        return [{ value: this.company.percentOwnership }, { value: 1 - this.company.percentOwnership }];
    }

    public onClose(): void {
        this.closePanel.emit();
    }
}
