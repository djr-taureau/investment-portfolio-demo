import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Group } from "@app/portfolio-listing/portfolio-listing-table/portfolio-listing-table.component";
import { CompanyDocument, CompanyDocumentTypeEnum, CompanyDocumentFormatEnum } from "@core/domain/document.model";
import { PortfolioTableItem } from "@core/domain/portfolio-table-item.model";

@Component({
    selector: "sbp-company-documents-table",
    templateUrl: "./company-documents-table.component.html",
    styleUrls: ["./company-documents-table.component.scss"]
})
export class CompanyDocumentsTableComponent {
    constructor() {}

    @Input()
    public documents: CompanyDocument[];

    @Output()
    public openDocument: EventEmitter<CompanyDocument> = new EventEmitter<CompanyDocument>();
    /**
     * List of columns to display in table
     */
    public displayedColumns: string[] = ["format", "name", "type", "dateAdded", "addedBy", "password", "comments"];
    // public displayedGroupColumns: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

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

    public getTypeImage(item: CompanyDocument) {
        switch (item.type) {
            case CompanyDocumentTypeEnum.BOARD:
            case CompanyDocumentTypeEnum.FINANCIALS:
            case CompanyDocumentTypeEnum.INVESTMENTCOMMITTEE:
            case CompanyDocumentTypeEnum.VALUATION:
                return "";
        }
    }

    public getFormatImage(item: CompanyDocument) {
        switch (item.format) {
            case CompanyDocumentFormatEnum.SLIDES:
            case CompanyDocumentFormatEnum.SPREADSHEET:
            case CompanyDocumentFormatEnum.DOCUMENT:
            case CompanyDocumentFormatEnum.PDF:
                return "";
        }
    }

    public onRowClick(document: CompanyDocument) {
        this.openDocument.emit(document);
    }

    public trackByFn = (index: number, item: any): number | string => {
        return item && item.id ? item.id : index;
    }
}
