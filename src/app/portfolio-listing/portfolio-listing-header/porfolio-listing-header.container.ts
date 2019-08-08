import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";
import { getSearchQuery } from "@core/state/portfolio-dashboard";
import { getGroupByOptions, getSelectedGroupByOption, getSelectedSortOption, getSortOptions } from "@core/state/portfolio-list";
import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
    selector: "sbp-portfolio-listing-header-container",
    template: `
        <sbp-portfolio-listing-header
            [regions]="regions$ | async"
            [groupingOptions]="groupingOptions$ | async"
            [selectedGroupOption]="selectedGroupingOption$ | async"
            [sortingOptions]="sortingOptions$ | async"
            [selectedSortOption]="selectedSortingOption$ | async"
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
    public sortingOptions$: Observable<IconizedItem[]>;
    public selectedSortingOption$: Observable<IconizedItem>;
    public groupingOptions$: Observable<IconizedItem[]>;
    public selectedGroupingOption$: Observable<IconizedItem>;
    public groupedResults;
    public portcoFilter$: Observable<string>;

    filterCompany = "";
    // GMAN: Remove these - they don't belong here
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
        this.groupingOptions$ = this.store$.pipe(select(getGroupByOptions));
        this.selectedGroupingOption$ = this.store$.pipe(select(getSelectedGroupByOption));
        this.sortingOptions$ = this.store$.pipe(select(getSortOptions));
        this.selectedSortingOption$ = this.store$.pipe(select(getSelectedSortOption));
    }

    public applyFilter($event) {}

    /**
     * Dispatches an action to filter the table.
     * @param query
     */
    public filter(query: string) {
        this.store$.dispatch(new CompanyFlowActions.FindCompanies(query));
    }

    /**
     * Dispatches an action to group the table.
     * @param group
     */
    public group(group: string) {
        this.store$.dispatch(new CompanyFlowActions.GroupCompanies(group));
    }

    public sort(sortValue: string) {
        // this.sortBy.emit(sortValue);
        this.store$.dispatch(new CompanyFlowActions.SortCompanies(sortValue));
    }
}
