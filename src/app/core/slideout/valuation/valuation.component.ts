import { DecimalPipe } from "@angular/common";
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
    styleUrls: ["./valuation.component.scss"],
    providers: [DecimalPipe]
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
            this.yearPlus1Date = value.valuationDetail.valuationForecast.reportingPeriod;
            this.exitDate = this.exitPresent ? value.valuationDetail.exit.reportingPeriod : null;
            // get the approved values
            const approvedRow: ValuationTableModel = new ValuationTableModel();
            approvedRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.approved / 1000000, "1.1-1");
            approvedRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.approved / 1000000, "1.1-1")
                : 0.0;
            approvedRow.actual = this.pipe.transform(value.valuationDetail.actual.approved / 1000000, "1.1-1");
            approvedRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.approved / 1000000, "1.1-1");
            approvedRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.approved / 1000000, "1.1-1") : 0;
            approvedRow.label = "Approved ($M)";
            this.dataSource.push(approvedRow);
            // get the invested values
            const investedRow: ValuationTableModel = new ValuationTableModel();
            investedRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.invested / 1000000, "1.1-1");
            investedRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.invested / 1000000, "1.1-1")
                : 0.0;
            investedRow.actual = this.pipe.transform(value.valuationDetail.actual.invested / 1000000, "1.1-1");
            investedRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.invested / 1000000, "1.1-1");
            investedRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.invested / 1000000, "1.1-1") : 0.0;
            investedRow.label = "Invested ($M)";
            this.dataSource.push(investedRow);
            // get the realized values
            const realizedValueRow: ValuationTableModel = new ValuationTableModel();
            realizedValueRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.realizedValue / 1000000, "1.1-1");
            realizedValueRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.realizedValue / 1000000, "1.1-1")
                : 0.0;
            realizedValueRow.actual = this.pipe.transform(value.valuationDetail.actual.realizedValue / 1000000, "1.1-1");
            realizedValueRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.realizedValue / 1000000, "1.1-1");
            realizedValueRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.realizedValue / 1000000, "1.1-1") : 0.0;
            realizedValueRow.label = "Realized Value ($M)";
            this.dataSource.push(realizedValueRow);
            // get the unrealizedValue values
            const unrealizedValueRow: ValuationTableModel = new ValuationTableModel();
            unrealizedValueRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.unrealizedValue / 1000000, "1.1-1");
            unrealizedValueRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.unrealizedValue / 1000000, "1.1-1")
                : 0.0;
            unrealizedValueRow.actual = this.pipe.transform(value.valuationDetail.actual.unrealizedValue / 1000000, "1.1-1");
            unrealizedValueRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.unrealizedValue / 1000000, "1.1-1");
            unrealizedValueRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.unrealizedValue / 1000000, "1.1-1") : 0.0;
            unrealizedValueRow.label = "Unrealized Value ($M)";
            this.dataSource.push(unrealizedValueRow);
            // get the totalValue values
            const totalValueRow: ValuationTableModel = new ValuationTableModel();
            totalValueRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.totalValue / 1000000, "1.1-1");
            totalValueRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.totalValue / 1000000, "1.1-1")
                : 0;
            totalValueRow.actual = this.pipe.transform(value.valuationDetail.actual.totalValue / 1000000, "1.1-1");
            totalValueRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.totalValue / 1000000, "1.1-1");
            totalValueRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.totalValue / 1000000, "1.1-1") : 0;
            totalValueRow.label = "Total Value ($M)";
            this.dataSource.push(totalValueRow);
            // get the moic values
            const moicRow: ValuationTableModel = new ValuationTableModel();
            moicRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.moic, "1.2-2") + "x";
            moicRow.icFollowOn1 = this.icFollowOn1Present ? this.pipe.transform(value.valuationDetail.icFollowOn1.moic, "1.2-2") + "x" : null;
            moicRow.actual = this.pipe.transform(value.valuationDetail.actual.moic, "1.2-2") + "x";
            moicRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.moic, "1.2-2") + "x";
            moicRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.moic, "1.2-2") + "x" : null;
            moicRow.label = "MOIC";
            this.dataSource.push(moicRow);
            // get the irr values
            const irrRow: ValuationTableModel = new ValuationTableModel();
            irrRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.irr, "1.1-1") + "%";
            irrRow.icFollowOn1 = this.icFollowOn1Present ? this.pipe.transform(value.valuationDetail.icFollowOn1.irr, "1.1-1") + "%" : null;
            irrRow.actual = this.pipe.transform(value.valuationDetail.actual.irr, "1.1-1") + "%";
            irrRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.irr, "1.1-1") + "%";
            irrRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.irr, "1.1-1") + "%" : null;
            irrRow.label = "Gross IRR";
            this.dataSource.push(irrRow);
            // get the companyEquityValue values
            const companyEquityValueRow: ValuationTableModel = new ValuationTableModel();
            companyEquityValueRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.companyEquityValue / 1000000, "1.1-1");
            companyEquityValueRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.companyEquityValue / 1000000, "1.1-1")
                : 0.0;
            companyEquityValueRow.actual = this.pipe.transform(value.valuationDetail.actual.companyEquityValue / 1000000, "1.1-1");
            companyEquityValueRow.valuationForecast = this.pipe.transform(
                value.valuationDetail.valuationForecast.companyEquityValue / 1000000,
                "1.1-1"
            );
            companyEquityValueRow.exit = this.exitPresent
                ? this.pipe.transform(value.valuationDetail.exit.companyEquityValue / 1000000, "1.1-1")
                : 0.0;
            companyEquityValueRow.label = "Company Equity Value ($M)";
            this.dataSource.push(companyEquityValueRow);
            // get the ownership values
            const ownershipRow: ValuationTableModel = new ValuationTableModel();
            ownershipRow.icInitial = this.pipe.transform(value.valuationDetail.icInitial.ownership, "1.1-1") + "%";
            ownershipRow.icFollowOn1 = this.icFollowOn1Present
                ? this.pipe.transform(value.valuationDetail.icFollowOn1.ownership, "1.1-1") + "%"
                : null;
            ownershipRow.actual = this.pipe.transform(value.valuationDetail.actual.ownership, "1.1-1") + "%";
            ownershipRow.valuationForecast = this.pipe.transform(value.valuationDetail.valuationForecast.ownership, "1.1-1") + "%";
            ownershipRow.exit = this.exitPresent ? this.pipe.transform(value.valuationDetail.exit.ownership, "1.1-1") + "%" : null;
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
    public displayedColumns: string[] = ["label", "icInitial", "icFollowOn1", "actual", "valuationForecast", "exit"];

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

    constructor(private pipe: DecimalPipe) {}

    ngOnInit() {}
}
