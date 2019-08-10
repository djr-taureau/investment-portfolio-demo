import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TeamMember } from "@core/domain/company.model";
import { Initiative, InitiativeStatusEnum } from "@core/domain/initiative.model";

@Component({
    selector: "sbp-company-initiatives-summary",
    templateUrl: "./company-initiatives-summary.component.html",
    styleUrls: ["./company-initiatives-summary.component.scss"]
})
export class CompanyInitiativesSummaryComponent {
    @Input()
    public initiatives: Initiative[];

    @Input()
    public owners: TeamMember[];

    @Input()
    public status: InitiativeStatusEnum[];

    @Output()
    public seeMore: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public filterByStatus: EventEmitter<InitiativeStatusEnum> = new EventEmitter<InitiativeStatusEnum>();

    @Output()
    public filterByOwner: EventEmitter<TeamMember> = new EventEmitter<TeamMember>();

    /**
     * Handles the "See more" click
     */
    public onSeeMore(): void {
        this.seeMore.emit();
    }

    public onFilterByOwner(owner: TeamMember): void {
        this.filterByOwner.emit(owner);
    }

    public onFilterByStatus(status: InitiativeStatusEnum): void {
        this.filterByStatus.emit(status);
    }

    constructor() {}
}
