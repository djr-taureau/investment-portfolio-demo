import { ValuationTableModel } from "./../../domain/company.model";
import { Logger } from "app/util/logger";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Company, Valuation } from "@core/domain/company.model";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "sbp-valuation-slideout",
    templateUrl: "./valuation.component.html",
    styleUrls: ["./valuation.component.scss"]
})
export class ValuationComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ValuationComponent");

    // Local props
    public companyName = "";
    public teamMemberCount = 0;
    public titleText = `All Team Members`;
    public icFollowOn1Present = true;
    public exitPresent = true;

    /**
     * Dispatched when user clicks a member to view the detail page
     */
    @Output()
    public goToDetail = new EventEmitter<any>();

    /**
     * The Company Groups
     */
    @Input()
    public set valuation(value: Valuation) {
        if (value) {
            this._valuation = value;

            if (!value.valuationDetail.icFollowOn1) {
                this.displayedColumns = this.displayedColumns.filter((e) => e !== "icFollowOn1");
                this.icFollowOn1Present = false;
            }
            if (!value.valuationDetail.exit) {
                this.displayedColumns = this.displayedColumns.filter((e) => e !== "exit");
                this.exitPresent = false;
            }

            // get the column header date values
            this.icInitialDate = value.valuationDetail.icInitial.reportingPeriod;
            this.icFollownOn1Date = this.icFollowOn1Present ? value.valuationDetail.icFollowOn1.reportingPeriod : null;
            this.actualDate = value.valuationDetail.actual.reportingPeriod;
            this.yearPlus1Date = value.valuationDetail.yearPlus1.reportingPeriod;
            this.exitDate = this.exitPresent ? value.valuationDetail.exit.reportingPeriod : null;
            // get the approved values
            const approvedRow: ValuationTableModel = new ValuationTableModel();
            approvedRow.icInitial = (value.valuationDetail.icInitial.approved / 1000000).toFixed(1);
            approvedRow.icFollowOn1 = this.icFollowOn1Present ? (value.valuationDetail.icFollowOn1.approved / 1000000).toFixed(1) : 0;
            approvedRow.actual = (value.valuationDetail.actual.approved / 1000000).toFixed(1);
            approvedRow.yearPlus1 = (value.valuationDetail.yearPlus1.approved / 1000000).toFixed(1);
            approvedRow.exit = this.exitPresent ? (value.valuationDetail.exit.approved / 1000000).toFixed(1) : 0;
            approvedRow.label = "Approved ($M)";
            this.dataSource.push(approvedRow);
            // get the invested values
            const investedRow: ValuationTableModel = new ValuationTableModel();
            investedRow.icInitial = (value.valuationDetail.icInitial.invested / 1000000).toFixed(1);
            investedRow.icFollowOn1 = this.icFollowOn1Present ? (value.valuationDetail.icFollowOn1.invested / 1000000).toFixed(1) : 0;
            investedRow.actual = (value.valuationDetail.actual.invested / 1000000).toFixed(1);
            investedRow.yearPlus1 = (value.valuationDetail.yearPlus1.invested / 1000000).toFixed(1);
            investedRow.exit = this.exitPresent ? (value.valuationDetail.exit.invested / 1000000).toFixed(1) : 0;
            investedRow.label = "Invested ($M)";
            this.dataSource.push(investedRow);
            // get the realized values
            const realizedValueRow: ValuationTableModel = new ValuationTableModel();
            realizedValueRow.icInitial = (value.valuationDetail.icInitial.realizedValue / 1000000).toFixed(1);
            realizedValueRow.icFollowOn1 = this.icFollowOn1Present ? (value.valuationDetail.icFollowOn1.realizedValue / 1000000).toFixed(1) : 0;
            realizedValueRow.actual = (value.valuationDetail.actual.realizedValue / 1000000).toFixed(1);
            realizedValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.realizedValue / 1000000).toFixed(1);
            realizedValueRow.exit = this.exitPresent ? (value.valuationDetail.exit.realizedValue / 1000000).toFixed(1) : 0;
            realizedValueRow.label = "Realized Value ($M)";
            this.dataSource.push(realizedValueRow);
            // get the unrealizedValue values
            const unrealizedValueRow: ValuationTableModel = new ValuationTableModel();
            unrealizedValueRow.icInitial = (value.valuationDetail.icInitial.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.icFollowOn1 = this.icFollowOn1Present ? (value.valuationDetail.icFollowOn1.unrealizedValue / 1000000).toFixed(1) : 0;
            unrealizedValueRow.actual = (value.valuationDetail.actual.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.exit = this.exitPresent ? (value.valuationDetail.exit.unrealizedValue / 1000000).toFixed(1) : 0;
            unrealizedValueRow.label = "Unrealized Value ($M)";
            this.dataSource.push(unrealizedValueRow);
            // get the totalValue values
            const totalValueRow: ValuationTableModel = new ValuationTableModel();
            totalValueRow.icInitial = (value.valuationDetail.icInitial.totalValue / 1000000).toFixed(1);
            totalValueRow.icFollowOn1 = this.icFollowOn1Present ? (value.valuationDetail.icFollowOn1.totalValue / 1000000).toFixed(1) : 0;
            totalValueRow.actual = (value.valuationDetail.actual.totalValue / 1000000).toFixed(1);
            totalValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.totalValue / 1000000).toFixed(1);
            totalValueRow.exit = this.exitPresent ? (value.valuationDetail.exit.totalValue / 1000000).toFixed(1) : 0;
            totalValueRow.label = "Total Value ($M)";
            this.dataSource.push(totalValueRow);
            // get the moic values
            const moicRow: ValuationTableModel = new ValuationTableModel();
            moicRow.icInitial = value.valuationDetail.icInitial.moic.toString() + "x";
            moicRow.icFollowOn1 = this.icFollowOn1Present ? value.valuationDetail.icFollowOn1.moic.toString() + "x" : null;
            moicRow.actual = value.valuationDetail.actual.moic.toString() + "x";
            moicRow.yearPlus1 = value.valuationDetail.yearPlus1.moic.toString() + "x";
            moicRow.exit = this.exitPresent ? value.valuationDetail.exit.moic.toString() + "x" : null;
            moicRow.label = "MOIC";
            this.dataSource.push(moicRow);
            // get the irr values
            const irrRow: ValuationTableModel = new ValuationTableModel();
            irrRow.icInitial = value.valuationDetail.icInitial.irr.toString() + "%";
            irrRow.icFollowOn1 = this.icFollowOn1Present ? value.valuationDetail.icFollowOn1.irr.toString() + "%" : null;
            irrRow.actual = value.valuationDetail.actual.irr.toString() + "%";
            irrRow.yearPlus1 = value.valuationDetail.yearPlus1.irr.toString() + "%";
            irrRow.exit = this.exitPresent ? value.valuationDetail.exit.irr.toString() + "%" : null;
            irrRow.label = "Gross IRR";
            this.dataSource.push(irrRow);
            // get the companyEquityValue values
            const companyEquityValueRow: ValuationTableModel = new ValuationTableModel();
            companyEquityValueRow.icInitial = (value.valuationDetail.icInitial.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.icFollowOn1 = this.icFollowOn1Present
                ? (value.valuationDetail.icFollowOn1.companyEquityValue / 1000000).toFixed(1)
                : 0;
            companyEquityValueRow.actual = (value.valuationDetail.actual.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.exit = this.exitPresent ? (value.valuationDetail.exit.companyEquityValue / 1000000).toFixed(1) : 0;
            companyEquityValueRow.label = "Company Equity Value ($M)";
            this.dataSource.push(companyEquityValueRow);
            // get the ownership values
            const ownershipRow: ValuationTableModel = new ValuationTableModel();
            ownershipRow.icInitial = value.valuationDetail.icInitial.ownership.toString() + "%";
            ownershipRow.icFollowOn1 = this.icFollowOn1Present ? value.valuationDetail.icFollowOn1.ownership.toString() + "%" : null;
            ownershipRow.actual = value.valuationDetail.actual.ownership.toString() + "%";
            ownershipRow.yearPlus1 = value.valuationDetail.yearPlus1.ownership.toString() + "%";
            ownershipRow.exit = this.exitPresent ? value.valuationDetail.exit.ownership.toString() + "%" : null;
            ownershipRow.label = "Ownership";
            this.dataSource.push(ownershipRow);
        }
    }
    public get valuation(): Valuation {
        return this._valuation;
    }
    private _valuation: Valuation;
    /**
     * The Company in context
     */
    @Input()
    public set company(theCompany: Company) {
        if (theCompany) {
            this._company = theCompany;
            this.companyName = theCompany.name;
        }
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

    /**
     * Dispatched when the user closes the slider
     */
    @Output()
    public closePanel: EventEmitter<any> = new EventEmitter();

    /**
     * DS for the table
     */
    public dataSource: ValuationTableModel[] = [];

    /**
     * Columns shown in table
     */
    public displayedColumns: string[] = ["label", "icInitial", "icFollowOn1", "actual", "yearPlus1", "exit"];

    /**
     * Data values for column headers
     */
    public icInitialDate = "";
    public icFollownOn1Date = "";
    public actualDate = "";
    public yearPlus1Date = "";
    public exitDate = "";

    /**
     * Handles the close of the slider by dispatching an event
     */
    public onClose(): void {
        ValuationComponent.logger.debug(`onClose()`);
        this.closePanel.emit();
    }

    constructor() {}

    ngOnInit() {}
}
