import { Component } from "@angular/core";
import { Logger } from "./util/logger";

@Component({
    selector: "sbp-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AppComponent");

    /**
     * Constructor.
     */
    constructor() {
        AppComponent.logger.debug(`constructor()`);
    }
}
