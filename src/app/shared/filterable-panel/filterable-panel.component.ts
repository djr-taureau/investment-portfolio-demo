import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
@Component({
    selector: "sbp-filterable-panel",
    templateUrl: "./filterable-panel.component.html",
    styleUrls: ["./filterable-panel.component.scss"]
})
export class FilterablePanelComponent {
    @Input()
    public title: string;

    @Input()
    public itemCount = 0;

    @Input()
    public filterListOne: IconizedItem[];

    @Input()
    public filterListTwo: IconizedItem[];

    /**
     * Filter List One popup settings
     */
    @Input()
    public popupSettingsOne = { width: 200 };

    /**
     * Filter List Two popup settings
     */
    @Input()
    public popupSettingsTwo = { width: 200 };

    /**
     * The icon used for filter menu one
     */
    @Input()
    public filterIconOne = "assets/image/filter.svg";

    /**
     * The icon used for filter menu two
     */
    @Input()
    public filterIconTwo = "assets/image/filter.svg";
    constructor() {}

    @Output()
    public filterChangeOne: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public filterChangeTwo: EventEmitter<any> = new EventEmitter<any>();
}
