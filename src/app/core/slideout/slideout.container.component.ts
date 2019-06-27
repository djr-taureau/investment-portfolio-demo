import { Component, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { SlideOutService } from "@core/slideout/slide-out.service";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-slideout-container",
    template: `
        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex>
            <ng-template #container></ng-template>
        </div>
    `,
    styleUrls: ["./slideout.container.component.scss"]
})
export class SlideoutContainerComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SlideoutContainerComponent");

    /**
     * Reference to the DOM injection point for the slide-out's content.
     */
    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    /**
     * Constructor.
     * @param store$
     * @param slideOutService
     */
    constructor(private store$: Store<any>, private slideOutService: SlideOutService) {
        SlideoutContainerComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        SlideoutContainerComponent.logger.debug(`ngOnInit()`);
        this.slideOutService.init(this.container);
    }
}
