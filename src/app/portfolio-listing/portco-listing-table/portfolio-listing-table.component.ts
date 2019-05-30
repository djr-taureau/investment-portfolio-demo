import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Company } from "../../core/domain/company.model";
import { Column, Group } from "../../core/domain/data-table.ui-model";
import { Logger } from "../../util/logger";

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

    /**
     * List of companies to display.
     *
     * Create rthe
     */
    @Input()
    public set companies(value: Company[]) {
        this._companies = value;
        if (!!value) {
            this.dataProvider = this.createDataProvider(value);
            // this._alldata = value;
        }
    }
    public get companies(): Company[] {
        return this._companies;
    }
    private _companies: Company[];

    /**
     * Data table's data provider.
     */
    private dataProvider = new MatTableDataSource([]);

    /**
     * List of columns for the table.
     */
    private columns: Column[];

    /**
     * List of columns displayed in the table.
     */
    private displayedColumns: string[];

    /**
     * List of columns group in the table.
     */
    private groupByColumns: string[];

    /**
     * Constructor.
     */
    constructor() {
        PortfolioListingTableComponent.logger.debug(`constructor()`);

        this.columns = this.createColumns();
        this.displayedColumns = this.columns.map((column) => column.field);
        this.groupByColumns = ["name"];
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingTableComponent.logger.debug(`ngOnInit()`);
    }

    /**
     * Groups the data for a given column.
     * @param event
     * @param column
     */
    public groupBy(event, column) {
        event.stopPropagation();
        this.checkGroupByColumn(column.field, true);
        this.dataProvider.data = this.addGroups(this.companies, this.groupByColumns);
        this.dataProvider.filter = performance.now().toString();
    }

    public checkGroupByColumn(field, add) {
        let found = null;
        for (const column of this.groupByColumns) {
            if (column === field) {
                found = this.groupByColumns.indexOf(column, 0);
            }
        }
        if (found != null && found >= 0) {
            if (!add) {
                this.groupByColumns.splice(found, 1);
            }
        } else {
            if (add) {
                this.groupByColumns.push(field);
            }
        }
    }

    /**
     * Ungroups the data for a given column.
     * @param event
     * @param column
     */
    public unGroupBy(event, column) {
        event.stopPropagation();
        this.checkGroupByColumn(column.field, false);
        this.dataProvider.data = this.addGroups(this.companies, this.groupByColumns);
        this.dataProvider.filter = performance.now().toString();
    }

    // below is for grid row grouping
    public customFilterPredicate(data: any | Group, filter: string): boolean {
        return data instanceof Group ? data.visible : this.getDataRowVisible(data);
    }

    public getDataRowVisible(data: any): boolean {
        const groupRows = this.dataProvider.data.filter((row) => {
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
        const parent = groupRows[0] as Group;
        return parent.visible && parent.expanded;
    }

    /**
     * Expands or collapses a group header based on its current state.
     * @param row
     */
    public groupHeaderClick(row) {
        row.expanded = !row.expanded;
        this.dataProvider.filter = performance.now().toString(); // bug here need to fix
    }

    public addGroups(data: any[], groupByColumns: string[]): any[] {
        const rootGroup = new Group();
        rootGroup.expanded = true;
        return this.getSublevel(data, 0, groupByColumns, rootGroup);
    }

    public getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
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
            group.totalCounts = rowsInGroup.length;
            const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
            subGroup.unshift(group);
            subGroups = subGroups.concat(subGroup);
        });
        return subGroups;
    }

    public uniqueBy(a, key) {
        const seen = {};
        return a.filter((item) => {
            const k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }

    public isGroup(index, item): boolean {
        return item.level;
    }

    /**
     * Creates the table's data provider from a list of companies.
     * @param value
     */
    private createDataProvider(value: Company[]): any {
        const dataProvider = new MatTableDataSource([]);
        dataProvider.data = this.addGroups(value, this.groupByColumns);
        dataProvider.filterPredicate = this.customFilterPredicate.bind(this);
        dataProvider.filter = performance.now().toString();
        return dataProvider;
    }

    /**
     * Creates the list of columns for the table.
     */
    private createColumns(): Column[] {
        return [
            {
                field: "name"
            },
            {
                field: "dealTeamLead"
            },
            {
                field: "sector"
            },
            {
                field: "amountInvested"
            },
            {
                field: "valuation"
            }
        ];
    }
}
