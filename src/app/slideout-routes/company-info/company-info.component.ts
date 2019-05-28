import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as _ from "lodash";

import { Company } from "../../core/domain/company.model";

@Component({
    selector: "sbp-company-info",
    templateUrl: "./company-info.component.html",
    styleUrls: ["./company-info.component.scss"]
})
export class CompanyInfoComponent {
    @Input()
    public company: Company;

    @Output()
    public closePanel: EventEmitter<any> = new EventEmitter();

    public getCompanyName(): string {
        return _.get(this.company, "name", "Test Company Name");
    }

    public onClose(): void {
        this.closePanel.emit();
    }
}
