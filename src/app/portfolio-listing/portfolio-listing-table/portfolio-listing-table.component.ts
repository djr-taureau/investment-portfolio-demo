import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Logger } from "@util/logger";
import { PortfolioTableItem } from "@app/core/domain/portfolio-table-item.model";

// - Region
// - Deal Lead
// - Sector
// - Country
// - Amount Invested ($0-$500M, $501-$1,000M, $1,000M+)
// - Valuation ($0-$500M, $501-$1,000M, $1,000M+)
// - MOIC (0.0x-1.0x, 1.1x-2.0x, >2.0x)
// - IRR (<0%, 0%-25%, 26%-50%, >50%)
export class Group {
    level = 0;
    count = 0;
    investedSum = 0;
    valuationSum = 0;
    moicSum = 0;
    irrSum = 0;
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

    @Output()
    public openCompanyDashboard: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    public set tableData(value: PortfolioTableItem[]) {
        if (value) {
            value.forEach((item) => {
                item.sectorsAdditional.value = item.sectors.length > 0 ? `+${item.sectors.length - 1}` : "";
                item.sectorsAdditional.visible = item.sectors.length > 1;
                item.sectorsGroup = item.sectors.toLocaleString();
                item.invested = item.invested / 1000000;
                item.totalValue = item.totalValue / 1000000;
                item.investedGroup = this.setValueGrouping(item.invested);
                item.valueGroup = this.setValueGrouping(item.totalValue);
                item.irr = item.irr * 100;
                item.irrGroup = this.setIrrGrouping(item.irr);
                item.moicGroup = this.setMoicGrouping(item.moic);
                item.teamLeadName = item.teamLeadName || "N/A";
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
    public displayedColumns: string[] = ["logo", "companyName", "teamLeadName", "sectors", "country", "invested", "totalValue", "moic", "irr"];
    public displayedGroupColumns: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

    /**
     * Could group by more than one value, but for now is singular and should be one of
     * "region", "teamLeadName", "sectors", "countries", "invested", "totalValue", "MOIC","IRR"
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

    public onRowClick(company: PortfolioTableItem) {
        this.openCompanyDashboard.emit(company.companyId);
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
                return a + b.invested;
            }, 0);
            group.valuationSum = rowsInGroup.reduce((a, b) => {
                return a + b.totalValue;
            }, 0);
            group.moicSum = rowsInGroup.reduce((a, b) => {
                return a + b.moic;
            }, 0);
            group.irrSumm = rowsInGroup.reduce((a, b) => {
                return a + b.irr;
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
            console.log(k);
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
                case "invested":
                    return compare(a.invested, b.invested);
                case "totalValue":
                    return compare(a.totalValue, b.totalValue);
                case "moic":
                    return compare(a.moic, b.moic);
                case "irr":
                    return compare(a.irr, b.irr);
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

    /**
     * Provides values to the table item to group by number
     * @param value
     */
    private setValueGrouping(value: number): string {
        if (value >= 0 && value <= 500) {
            return "$0-$500M";
        } else if (value > 500 && value <= 1000) {
            return "$501-$1,000M";
        } else {
            return "$1,000M+";
        }
    }

    /**
     * Provides values to the table item to group by moic
     * @param value
     */
    private setMoicGrouping(value: number): string {
        if (value >= 0 && value <= 1.0) {
            return "0.0x-1.0x";
        } else if (value > 1.0 && value <= 2.0) {
            return "1.1x-2.0x";
        } else {
            return ">2.0x";
        }
    }

    /**
     * Provides values to the table item to group by irr
     * @param value
     */
    private setIrrGrouping(value: number): string {
        if (value < 0) {
            return "<0%";
        } else if (value >= 0 && value <= 25) {
            return "0%-25%";
        } else if (value > 25 && value <= 50) {
            return "26%-50%";
        } else {
            return ">50%";
        }
    }
}
