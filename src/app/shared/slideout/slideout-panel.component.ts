import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-slideout-panel",
    templateUrl: "./slideout-panel.component.html",
    styleUrls: ["./slideout-panel.component.scss"]
})
export class SlideoutPanelComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SlideoutComponent");

    @Input()
    public show: boolean;

    @Input()
    public preTitleText: string;

    @Input()
    public titleText: string;

    @Input()
    public itemCount = 0;

    @Output()
    public close: EventEmitter<any> = new EventEmitter();

    public onClose(): void {
        this.close.emit();
    }

    constructor() {}

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        SlideoutPanelComponent.logger.debug(`ngOnInit()`);
    }
}
