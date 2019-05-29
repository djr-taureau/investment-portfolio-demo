import { Component, OnInit } from "@angular/core";
import { of, Observable } from "rxjs";
import { Logger } from "app/util/logger";
import { BoardMember } from "app/core/domain/company.model";

@Component({
    selector: "company-detail-container",
    template: `
        <company-detail-component [boardMembers]="boardMembers$ | async"> </company-detail-component>
    `
})
export class CompanyDetailContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyDetailContainer");

    public boardMembers$: Observable<BoardMember[]>;

    constructor() {
        CompanyDetailContainer.logger.debug(`constructor()`);
    }

    ngOnInit() {
        this.boardMembers$ = of([
            {
                name: "tim mcgee",
                sinceDate: "May 2018",
                company: "benchmark capital",
                phone: "(510) 123-4567",
                email: "bruce.dunlevle@benchmarkcapital.com",
                avatar: "assets/image/nauset.jpg"
            }
        ]);

        this.boardMembers$.subscribe((data) => CompanyDetailContainer.logger.debug(JSON.stringify(data[0])));
    }
}
