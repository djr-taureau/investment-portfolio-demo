import { Component, Input, EventEmitter, Output } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { FormControl } from "@angular/forms";
import { Column, Group } from "@core/domain/data-table.ui-model";
import { Logger } from "@util/logger";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { CustomIconService } from "@core/service/custom-icon.service";
@Component({
    selector: "sbp-portfolio-listing-header",
    templateUrl: "./portfolio-listing-header.component.html",
    styleUrls: ["./portfolio-listing-header.component.scss"]
})
export class PortfolioListingHeaderComponent {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingHeaderComponent");
    groupBy = new FormControl();
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private customIconService: CustomIconService) {
        customIconService.init();
    }
    @Input() regions: any[];
    @Input() sortCategories: any[];
    @Input() companyFilter = "";
    @Output() selectionChange: EventEmitter<MatSelectChange>;
    @Output() filter = new EventEmitter<string>();
    @Output() group = new EventEmitter<string>();
    @Output() sort = new EventEmitter<string>();
}
