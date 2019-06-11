import { Component, OnInit, Input } from "@angular/core";
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
    set listItems(items: Array<IconizedItem>) {
        this.data = items.slice();
        this.source = items.slice();
    }
    public data: Array<IconizedItem>;
    public source: Array<IconizedItem>;

    @Input()
    public popupSettings = { width: 200 };

    /**
     * ngModel must be used since the list items are object based
     */
    public selectedItem: IconizedItem;

    /**
     * Sets list data source to filtered set
     */
    handleFilter(value) {
        this.data = this.source.filter((s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    constructor() {}

    ngOnInit() {}
}
