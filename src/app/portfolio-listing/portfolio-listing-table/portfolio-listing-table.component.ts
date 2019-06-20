import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, Sort } from "@angular/material";
import { Company } from "@core/domain/company.model";
import { Column } from "@core/domain/data-table.ui-model";
import { Logger } from "@util/logger";
import * as _ from "lodash";
import { PortfolioTableItem } from "@app/core/domain/portfolio-table-item.model";

export class Group {
    level = 0;
    count = 0;
    investedSum = 0;
    valuationSum = 0;
    moicSum = 0;
    irrSum = "N/A";
    parent: Group;
    expanded = true;
    get visible(): boolean {
        return !this.parent || (this.parent.visible && this.parent.expanded);
    }
}

@Component({
    selector: "sbp-portfolio-listing-table",
    templateUrl: "./portfolio-listing-table.component.html",
    styleUrls: ["./portfolio-listing-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListingTableComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingTableComponent");

    @Input()
    public set tableData(value: PortfolioTableItem[]) {
        if (value) {
            value.forEach((item) => {
                item.sectorsAdditional.value = item.sectors.length > 0 ? `+${item.sectors.length - 1}` : "";
                item.sectorsAdditional.visible = item.sectors.length > 1;
                item.amountInvested = item.amountInvested / 1000000;
                item.currentValuation = item.currentValuation / 1000000;
                item.IRR = item.IRR * 100;
            });
            this._tableData = value.slice();
            this.dataSource.data = this.addGroups(value, this.groupByColumns);
        }
    }
    public get tableData(): PortfolioTableItem[] {
        return this._tableData;
    }
    private _tableData: PortfolioTableItem[];

    @Input()
    public set filter(value: string[]) {
        this._filter = value;
        if (!value || value.length === 0) {
            this.filteredData = [];
        } else {
            this.filteredData = this.filterData(value, this.tableData);
        }
        this.setDataSource();
    }
    public get filter() {
        return this._filter || [];
    }
    private _filter: string[];

    @Input()
    public set groupByColumn(value: string) {
        if (value === "") {
            this.groupByColumns = [];
            this.groupedData = [];
            this.setDataSource();
        } else {
            this.groupByColumns = [value];
            this.groupedData = this.addGroups(this.tableData, this.groupByColumns);
            this.setDataSource();
        }
    }

    @Input()
    public set sortByColumn(value: string) {
        this.sortColumn = value;
        if (value === "") {
            this.sortedData = [];
        }
        this.sortedData = this.sortData(value, this.tableData);
        this.setDataSource();
    }
    public get sortByColumn() {
        return this.sortColumn;
    }
    private sortColumn: string;

    /**
     * Sorted, filtered, and grouped data holders
     */
    public sortedData: PortfolioTableItem[] = [];
    public groupedData: PortfolioTableItem[] = [];
    public filteredData: PortfolioTableItem[] = [];

    /**
     * List of columns to display in table
     */
    public displayedColumns: string[] = [
        "logo",
        "companyName",
        "teamLeadName",
        "sectors",
        "country",
        "amountInvested",
        "currentValuation",
        "MOIC",
        "IRR"
    ];

    /**
     * Could group by more than one value, but for now is singular and should be one of
     * "region", "teamLeadName", "sectors", "countries", "amountInvested", "currentValuation", "MOIC","IRR"
     * by design
     */
    public groupByColumns: string[] = [];

    /**
     * Data table's data provider.
     */
    public dataSource = new MatTableDataSource<PortfolioTableItem | Group>([]);

    /**
     * Handles all of the permutations of filtering, sorting, grouping
     */
    public setDataSource() {
        if (this.filteredData.length === 0 && this.sortedData.length === 0 && this.groupedData.length === 0) {
            this.dataSource.data = this.tableData.slice();
        } else if (this.filteredData.length === 0 && this.sortedData.length === 0 && this.groupedData.length !== 0) {
            this.dataSource.data = this.groupedData.slice();
        } else if (this.filteredData.length === 0 && this.sortedData.length !== 0 && this.groupedData.length === 0) {
            this.dataSource.data = this.sortedData.slice();
        } else if (this.filteredData.length === 0 && this.sortedData.length !== 0 && this.groupedData.length !== 0) {
            // we were in sorted and grouped and filter has been turned off
            // resort the original, then regroup that and set data source
            this.sortedData = this.sortData(this.sortByColumn, this.tableData);
            this.groupedData = this.addGroups(this.sortedData, this.groupByColumns);
            this.dataSource.data = this.groupedData.slice();
        } else if (this.filteredData.length !== 0 && this.sortedData.length === 0 && this.groupedData.length === 0) {
            // either sorting or grouping turned off and the other was already off
            this.dataSource.data = this.filteredData.slice();
        } else if (this.filteredData.length !== 0 && this.sortedData.length === 0 && this.groupedData.length !== 0) {
            // we were in filtered and grouped and sorting has been turned off
            // refilter the original, then regroup that and set data source
            this.filteredData = this.filterData(this.filter, this.tableData);
            this.groupedData = this.addGroups(this.filteredData, this.groupByColumns);
            this.dataSource.data = this.groupedData.slice();
        } else if (this.filteredData.length !== 0 && this.sortedData.length !== 0 && this.groupedData.length === 0) {
            // we had filtering, sorting, and grouping and grouping has been turned off
            // refilter the original, then resort that and set data source
            this.filteredData = this.filterData(this.filter, this.tableData);
            this.sortedData = this.sortData(this.sortByColumn, this.filteredData);
            this.dataSource.data = this.sortedData.slice();
        } else if (this.filteredData.length !== 0 && this.sortedData.length !== 0 && this.groupedData.length !== 0) {
            // they're all on
            // filter the original, then sort that, then group that and set data source
            this.filteredData = this.filterData(this.filter, this.tableData);
            this.sortedData = this.sortData(this.sortByColumn, this.filteredData);
            this.groupedData = this.addGroups(this.sortedData, this.groupByColumns);
            this.dataSource.data = this.groupedData.slice();
        }
    }

    /**
     * Not in use, but if we wanted to click on header to sort
     */
    public groupHeaderClick(row) {
        row.expanded = !row.expanded;
        this.dataSource.filter = performance.now().toString(); // hack to trigger filter refresh
    }

    /**
     * Indicates to header if we're in group mode.
     */
    public isGroup(index, item): boolean {
        return item.level;
    }

    constructor() {
        // this.dataSource.data = this.addGroups(people, this.groupByColumns);
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    }

    ngOnInit() {}

    private customFilterPredicate(data: PortfolioTableItem | Group, filter: string): boolean {
        return data instanceof Group ? data.visible : this.getDataRowVisible(data);
    }

    private getDataRowVisible(data: PortfolioTableItem): boolean {
        const groupRows = this.dataSource.data.filter((row) => {
            if (!(row instanceof Group)) {
                return false;
            }

            let match = true;
            this.groupByColumns.forEach((column) => {
                if (!row[column] || !data[column] || row[column] !== data[column]) {
                    match = false;
                }
            });
            return match;
        });

        if (groupRows.length === 0) {
            return true;
        }
        if (groupRows.length > 1) {
            throw new Error("Data row is in more than one group!");
        }
        const parent = groupRows[0] as Group; // </Group> (Fix syntax coloring)

        return parent.visible && parent.expanded;
    }

    private addGroups(data: any[], groupByColumns: string[]): any[] {
        const rootGroup = new Group();
        return this.getSublevel(data, 0, groupByColumns, rootGroup);
    }

    private getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
        // Recursive function, stop when there are no more levels.
        if (level >= groupByColumns.length) {
            return data;
        }

        const groups = this.uniqueBy(
            data.map((row) => {
                const result = new Group();
                result.level = level + 1;
                result.parent = parent;
                for (let i = 0; i <= level; i++) {
                    result[groupByColumns[i]] = row[groupByColumns[i]];
                }
                return result;
            }),
            JSON.stringify
        );

        const currentColumn = groupByColumns[level];

        let subGroups = [];
        groups.forEach((group) => {
            const rowsInGroup = data.filter((row) => group[currentColumn] === row[currentColumn]);
            // do summations
            group.investedSum = rowsInGroup.reduce((a, b) => {
                return a + b.amountInvested;
            }, 0);
            group.valuationSum = rowsInGroup.reduce((a, b) => {
                return a + b.currentValuation;
            }, 0);
            group.moicSum = rowsInGroup.reduce((a, b) => {
                return a + b.MOIC;
            }, 0);
            group.count = rowsInGroup.length;
            const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
            subGroup.unshift(group);
            subGroups = subGroups.concat(subGroup);
        });
        return subGroups;
    }

    private uniqueBy(a, key) {
        const seen = {};
        return a.filter((item) => {
            const k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }

    /**
     * Sorts the data according to the column name passed in. isAsc isn't implemented
     * at the moment but could be
     */
    private sortData(sortValue: string, dataToSort: PortfolioTableItem[]): PortfolioTableItem[] {
        let data = dataToSort.slice();
        const compare = (a: number | string, b: number | string, isAsc = true): number => {
            return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        };

        data = data.sort((a, b) => {
            switch (sortValue) {
                case "companyName":
                    return compare(a.companyName, b.companyName);
                case "amountInvested":
                    return compare(a.amountInvested, b.amountInvested);
                case "currentValuation":
                    return compare(a.currentValuation, b.currentValuation);
                case "MOIC":
                    return compare(a.MOIC, b.MOIC);
                case "IRR":
                    return compare(a.IRR, b.IRR);
                default:
                    return 0;
            }
        });
        return data;
    }

    /**
     * Filters specifically on companyName matches
     */
    private filterData(values: string[], dataToFilter: PortfolioTableItem[]): PortfolioTableItem[] {
        const data = dataToFilter.slice();
        return data.filter((item) => values.includes(item.companyName));
    }
}
