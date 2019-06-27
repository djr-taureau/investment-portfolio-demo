import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AppVersion, VERSION } from "../../../version";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("FooterComponent");

    /**
     * The version for the application and Git hash.
     *
     * NOTE: Made this a public value so the underlying HTML template could access it as well.
     */
    public appVersion: AppVersion = VERSION;

    /**
     * Constructor.
     */
    constructor() {
        FooterComponent.logger.debug(`constructor()`);
    }

    /**
     * Init the component.
     */
    public ngOnInit() {}
}
