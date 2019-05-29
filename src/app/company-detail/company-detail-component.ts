import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { BoardMember } from "app/core/domain/company.model";
import { Logger } from "app/util/logger";

@Component({
    selector: "company-detail-component",
    templateUrl: "./company-detail-component.html",
    styleUrls: ["./company-detail-component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyDetailComponent");

    @Input()
    public boardMembers: BoardMember[];

    constructor() {
        CompanyDetailComponent.logger.debug(`constructor()`);
    }

    ngOnInit() {
        CompanyDetailComponent.logger.debug(JSON.stringify(this.boardMembers[0]));
    }
}
