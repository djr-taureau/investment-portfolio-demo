import { trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { fadeIn, fadeOut } from "@shared/animations/fade.animations";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-ghost-summary-widget",
    templateUrl: "./ghost-summary-widget.component.html",
    styleUrls: ["./ghost-summary-widget.component.scss"],
    animations: [trigger("fadeOut", fadeOut()), trigger("fadeIn", fadeIn(":enter"))]
})
export class GhostSummaryWidgetComponent {
    /**
     * Logger
     */
    private static logger: Logger = Logger.getLogger("GhostSummaryWidgetComponent");

    /**
     * Flag indicating if the widget is selected.
     */
    @Input()
    public selected = false;

    /**
     * Constructor.
     */
    constructor() {}
}
