import * as _ from "lodash";
import { Company, TeamMember } from "@core/domain/company.model";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-company-info",
    templateUrl: "./company-info.component.html",
    styleUrls: ["./company-info.component.scss"]
})
export class CompanyInfoComponent {
    /**
     * The Company in context
     */
    @Input()
    public set company(theCompany: Company) {
        if (theCompany) {
            this._company = theCompany;
            // Make the sectors a list of names
            this.sectorList = theCompany.sectors
                .map((item) => {
                    return item.name;
                })
                .join(", ");
            // Donut chart requires this format
            // this.chartData = [{ value: theCompany.percentOwnership }, { value: 1 - theCompany.percentOwnership }];
            // this.fiscalYearEndString =
        }
    }
    public get company(): Company {
        return this._company;
    }

    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyInfoComponent");

    @Input()
    public boardMembers: TeamMember[];

    private _company: Company;

    // Local props
    public chartData: any[] = [];
    public sectorList: string;
    public fiscalYearEndString: string;

    /**
     * Dispatched when the user closes the slider
     */
    @Output()
    public closePanel: EventEmitter<any> = new EventEmitter();

    public getOwnershipPercent() {
        return _.get(this, "company.fdOwnership", 0);
    }

    public getCompanySectors() {
        return _.get(this, "company.sectors", []);
    }

    /**
     * Handles the close of the slider by dispatching an event
     */
    public onClose(): void {
        CompanyInfoComponent.logger.debug(`onClose()`);
        this.closePanel.emit();
    }
}
