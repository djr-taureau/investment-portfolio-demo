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
            // get the column header date values
            this.icInitialDate = value.valuationDetail.icInitial.reportingPeriod;
            this.icFollownOn1Date = value.valuationDetail.icFollowOn1.reportingPeriod;
            this.actualDate = value.valuationDetail.actuals.reportingPeriod;
            this.yearPlus1Date = value.valuationDetail.yearPlus1.reportingPeriod;
            this.exitDate = value.valuationDetail.exit.reportingPeriod;
            // get the approved values
            const approvedRow: ValuationTableModel = new ValuationTableModel();
            approvedRow.icInitial = (value.valuationDetail.icInitial.approved / 1000000).toFixed(1);
            approvedRow.icFollowOn1 = (value.valuationDetail.icFollowOn1.approved / 1000000).toFixed(1);
            approvedRow.actual = (value.valuationDetail.actuals.approved / 1000000).toFixed(1);
            approvedRow.yearPlus1 = (value.valuationDetail.yearPlus1.approved / 1000000).toFixed(1);
            approvedRow.exit = (value.valuationDetail.exit.approved / 1000000).toFixed(1);
            approvedRow.label = "Approved ($M)";
            this.dataSource.push(approvedRow);
            // get the invested values
            const investedRow: ValuationTableModel = new ValuationTableModel();
            investedRow.icInitial = (value.valuationDetail.icInitial.invested / 1000000).toFixed(1);
            investedRow.icFollowOn1 = (value.valuationDetail.icFollowOn1.invested / 1000000).toFixed(1);
            investedRow.actual = (value.valuationDetail.actuals.invested / 1000000).toFixed(1);
            investedRow.yearPlus1 = (value.valuationDetail.yearPlus1.invested / 1000000).toFixed(1);
            investedRow.exit = (value.valuationDetail.exit.invested / 1000000).toFixed(1);
            investedRow.label = "Invested ($M)";
            this.dataSource.push(investedRow);
            // get the realized values
            const realizedValueRow: ValuationTableModel = new ValuationTableModel();
            realizedValueRow.icInitial = (value.valuationDetail.icInitial.realizedValue / 1000000).toFixed(1);
            realizedValueRow.icFollowOn1 = (value.valuationDetail.icFollowOn1.realizedValue / 1000000).toFixed(1);
            realizedValueRow.actual = (value.valuationDetail.actuals.realizedValue / 1000000).toFixed(1);
            realizedValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.realizedValue / 1000000).toFixed(1);
            realizedValueRow.exit = (value.valuationDetail.exit.realizedValue / 1000000).toFixed(1);
            realizedValueRow.label = "Realized Value ($M)";
            this.dataSource.push(realizedValueRow);
            // get the unrealizedValue values
            const unrealizedValueRow: ValuationTableModel = new ValuationTableModel();
            unrealizedValueRow.icInitial = (value.valuationDetail.icInitial.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.icFollowOn1 = (value.valuationDetail.icFollowOn1.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.actual = (value.valuationDetail.actuals.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.exit = (value.valuationDetail.exit.unrealizedValue / 1000000).toFixed(1);
            unrealizedValueRow.label = "Unrealized Value ($M)";
            this.dataSource.push(unrealizedValueRow);
            // get the totalValue values
            const totalValueRow: ValuationTableModel = new ValuationTableModel();
            totalValueRow.icInitial = (value.valuationDetail.icInitial.totalValue / 1000000).toFixed(1);
            totalValueRow.icFollowOn1 = (value.valuationDetail.icFollowOn1.totalValue / 1000000).toFixed(1);
            totalValueRow.actual = (value.valuationDetail.actuals.totalValue / 1000000).toFixed(1);
            totalValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.totalValue / 1000000).toFixed(1);
            totalValueRow.exit = (value.valuationDetail.exit.totalValue / 1000000).toFixed(1);
            totalValueRow.label = "Total Value ($M)";
            this.dataSource.push(totalValueRow);
            // get the moic values
            const moicRow: ValuationTableModel = new ValuationTableModel();
            moicRow.icInitial = value.valuationDetail.icInitial.moic.toString() + "x";
            moicRow.icFollowOn1 = value.valuationDetail.icFollowOn1.moic.toString() + "x";
            moicRow.actual = value.valuationDetail.actuals.moic.toString() + "x";
            moicRow.yearPlus1 = value.valuationDetail.yearPlus1.moic.toString() + "x";
            moicRow.exit = value.valuationDetail.exit.moic.toString() + "x";
            moicRow.label = "MOIC";
            this.dataSource.push(moicRow);
            // get the irr values
            const irrRow: ValuationTableModel = new ValuationTableModel();
            irrRow.icInitial = value.valuationDetail.icInitial.irr.toString() + "%";
            irrRow.icFollowOn1 = value.valuationDetail.icFollowOn1.irr.toString() + "%";
            irrRow.actual = value.valuationDetail.actuals.irr.toString() + "%";
            irrRow.yearPlus1 = value.valuationDetail.yearPlus1.irr.toString() + "%";
            irrRow.exit = value.valuationDetail.exit.irr.toString() + "%";
            irrRow.label = "Gross IRR";
            this.dataSource.push(irrRow);
            // get the companyEquityValue values
            const companyEquityValueRow: ValuationTableModel = new ValuationTableModel();
            companyEquityValueRow.icInitial = (value.valuationDetail.icInitial.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.icFollowOn1 = (value.valuationDetail.icFollowOn1.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.actual = (value.valuationDetail.actuals.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.yearPlus1 = (value.valuationDetail.yearPlus1.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.exit = (value.valuationDetail.exit.companyEquityValue / 1000000).toFixed(1);
            companyEquityValueRow.label = "Company Equity Value ($M)";
            this.dataSource.push(companyEquityValueRow);
            // get the ownership values
            const ownershipRow: ValuationTableModel = new ValuationTableModel();
            ownershipRow.icInitial = value.valuationDetail.icInitial.ownership.toString() + "%";
            ownershipRow.icFollowOn1 = value.valuationDetail.icFollowOn1.ownership.toString() + "%";
            ownershipRow.actual = value.valuationDetail.actuals.ownership.toString() + "%";
            ownershipRow.yearPlus1 = value.valuationDetail.yearPlus1.ownership.toString() + "%";
            ownershipRow.exit = value.valuationDetail.exit.ownership.toString() + "%";
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
