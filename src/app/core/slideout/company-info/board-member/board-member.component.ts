import * as _ from "lodash";
import { BoardMember, TeamMember } from "@core/domain/company.model";
import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Logger } from "@util/logger";

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
    public boardMembers: TeamMember[];

    @Input()
    public getBoardMemberCount() {
        return _.get(this, "boardMembers", []).length;
    }

    constructor() {
        BoardMemberComponent.logger.debug(`constructor()`);
    }

    ngOnInit() {}
}
