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

    @Input()
    public count: number;

    @Output()
    public seeMore: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public filterByStatus: EventEmitter<InitiativeStatusEnum> = new EventEmitter<InitiativeStatusEnum>();

    @Output()
    public filterByOwner: EventEmitter<TeamMember> = new EventEmitter<TeamMember>();

    public getStatusImage(item: Initiative) {
        switch (item.status) {
            case InitiativeStatusEnum.IN_PROGRESS_ON_TRACK:
                return `assets/image/on-track.svg`;
            case InitiativeStatusEnum.IN_PROGRESS_NEEDS_ATTN:
                return `assets/image/some-issues.svg`;
            case InitiativeStatusEnum.COMPLETE:
                return `assets/image/need-help.svg`;
            case InitiativeStatusEnum.QUEUED_TO_START:
                return `assets/image/on-hold.svg`;
        }
    }
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

    public trackByFn = (index: number, item: any): number | string => {
        return item && item.id ? item.id : index;
    }

    constructor() {}
}
