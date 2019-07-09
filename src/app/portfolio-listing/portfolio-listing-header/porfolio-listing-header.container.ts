import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { getFilteredCompanies, getSearchQuery } from "@core/state";
import { FindCompanies } from "@core/state/flow/flow.actions";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
    selector: "sbp-portfolio-listing-header-container",
    template: `
        <sbp-portfolio-listing-header
            [regions]="regions$ | async"
            [sortCategories]="sortCategories$ | async"
            (filter)="filter($event)"
            (group)="group($event)"
            (sort)="sort($event)"
        ></sbp-portfolio-listing-header>
    `
})
export class PortfolioListingHeaderContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingHeaderContainer");

    public regions$: Observable<any>;
    public sortCategories$: Observable<any>;
    public portcoFilter$: Observable<string>;
    filterCompany = "";
    groupedResults;

    @Output() groupBy = new EventEmitter<string>();
    @Output() sortBy = new EventEmitter<string>();
    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        this.portcoFilter$ = store$.pipe(
            select(getSearchQuery),
            take(1)
        );

        PortfolioListingHeaderContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingHeaderContainer.logger.debug(`ngOnInit()`);
        const foo = this.store$.pipe(select(getFilteredCompanies));
    }
    public applyFilter($event) {}

    filter(query: string) {
        this.store$.dispatch(new FindCompanies(query));
    }

    group(group: string) {
        const typeGroup = this.store$.pipe(select(getFilteredCompanies));
        typeGroup.subscribe((result) => {
            this.groupedResults = result.reduce((p, n) => {
                if (!p[n.type]) {
                    p[n.type] = [];
                }
                p[n.type].push(n);
                return p;
            }, {});
        });
        this.groupBy.emit(group);
    }

    sort(sortValue: string) {
        this.sortBy.emit(sortValue);
    }
}
