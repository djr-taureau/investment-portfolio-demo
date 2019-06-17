import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-footer-container",
    template: `
        <sbp-footer></sbp-footer>
    `
})
export class FooterContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("FooterContainer");

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>) {
        FooterContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {}
}
