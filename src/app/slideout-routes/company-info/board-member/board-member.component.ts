import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { BoardMember } from "app/core/domain/company.model";
import { Logger } from "app/util/logger";

@Component({
    selector: "sbp-board-member",
    templateUrl: "./board-member.component.html",
    styleUrls: ["./board-member.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMemberComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("BoardMemberComponent");

    /**
     * Array of BoardMembers passed in from container
     */
    @Input()
    public boardMembers: BoardMember[];

    constructor() {
        BoardMemberComponent.logger.debug(`constructor()`);
    }

    ngOnInit() {}
}
