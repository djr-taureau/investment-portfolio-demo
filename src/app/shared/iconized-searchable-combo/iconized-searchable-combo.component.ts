import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IconizedItem } from "./iconized-item";
import { PopupConfig } from "./popup-config";

@Component({
    selector: "sbp-iconized-searchable-combo",

    templateUrl: "./iconized-searchable-combo.component.html",
    styleUrls: ["./iconized-searchable-combo.component.scss"]
})
export class IconizedSearchableComboComponent implements OnInit {
    /**
     * Sets up two arrays of the data where one is filtered
     * and the other is never mutated. The filtered one is
     * used as the data source for the list.
     */
    @Input()
    set listItems(items: Array<any>) {
        if (items) {
            this.data = items.slice();
            this.source = items.slice();
        }
    }

    /**
     * NOTE: It's important to set a default array with at least one item so we can always set the
     */
    public data: Array<any>;
    public source: Array<any>;

    /**
     * Path to the icon to use for the main icon of the control
     */
    @Input()
    public mainIconSrc = "assets/image/company.svg";

    @Input()
    public showFilter = true;

    /**
     * The field in the data item to evaluate for the label
     */
    @Input()
    public textField = "text";

    /**
     * The field in the data item to evaluate for the value
     */
    @Input()
    public valueField = "id";

    @Input()
    public popupSettings = { width: 200 };

    @Output()
    public selectionChange: EventEmitter<any> = new EventEmitter();

    /**
     * ngModel must be used since the list items are object based
     */
    @Input()
    public selectedItem: IconizedItem;

    public currentSearchValue = "";

    /**
     * It appears that we're always setting the selected value to the last element so we'll do it here as well.
     * Attempts to set it via the Kendo DropDown API were unsuccessful.
     */
    public getDefaultValue(): any {
        return this.data.length > 0 ? this.data[this.data.length - 1] : {};
    }

    /**
     * Sets list data source to filtered set
     */
    handleFilter(value) {
        this.data = this.source.filter((s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.currentSearchValue = value;
    }

    /**
     * Handles the changing of the selection
     * @param event
     */
    public onSelectionChange(event) {
        this.selectionChange.emit(event);
    }

    public getDataItemLabel(dataItem): string {
        return dataItem ? dataItem[this.textField] : "";
    }

    constructor() {}

    ngOnInit() {}
}
