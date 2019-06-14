import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material";
import * as fromCompanyState from "../../core/state/portfolio";
import { FindCompanyActions } from "../../core/state/portfolio/search";
import { CompanyActions } from "../../core/state/company";
import { Company } from "../../core/domain/company.model";
import { Column, Group } from "../../core/domain/data-table.ui-model";
import { Logger } from "../../util/logger";

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
    constructor(private store$: Store<fromCompanyState.State>) {
        this.portcoFilter$ = store$.pipe(
            select(fromCompanyState.getSearchQuery),
            take(1)
        );

        PortfolioListingHeaderContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingHeaderContainer.logger.debug(`ngOnInit()`);
        const foo = this.store$.pipe(select(fromCompanyState.getFilteredCompanies));
        this.portcoFilter$.subscribe((v) => console.log(v));
        foo.subscribe((v) => console.log("filtered companies", v));
    }
    public applyFilter($event) {
        console.log($event.target.value);
    }

    filter(query: string) {
        console.log(query);
        this.store$.dispatch(FindCompanyActions.filterCompanies({ query }));
    }

    group(group: string) {
        console.log(group);
        const typeGroup = this.store$.pipe(select(fromCompanyState.getFilteredCompanies));
        typeGroup.subscribe((result) => {
            this.groupedResults = result.reduce((p, n) => {
                if (!p[n.type]) {
                    p[n.type] = [];
                }
                p[n.type].push(n);
                return p;
            }, {});
        });
        console.log("grouped", this.groupedResults);
        console.log("group value", group);
        this.groupBy.emit(group);
    }

    sort(sortValue: string) {
        console.log("sortValue", sortValue);
        this.sortBy.emit(sortValue);
    }
}
