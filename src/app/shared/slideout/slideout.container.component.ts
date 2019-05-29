import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromState from "../../core/state";
import { ToggleSlideout } from "../../core/state/layout/layout.actions";
import { Logger } from "../../util/logger";
@Component({
    selector: "sbp-slideout-container",
    template: `
        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex><router-outlet name="sidebar-outlet"></router-outlet></div>
    `,
    styleUrls: ["./slideout.container.component.scss"]
})
export class SlideoutContainerComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SlideoutContainerComponent");

    /**
     * Controls visibility of the slide out container
     */
    public showSlideout$: Observable<boolean>;

    /**
     * Handles closing the slideout panel
     */
    public onClose(): void {
        this.store$.dispatch(new ToggleSlideout(false));
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        SlideoutContainerComponent.logger.debug(`ngOnInit()`);
        this.showSlideout$ = this.store$.pipe(select(fromState.getShowSlideout));
    }
    constructor(private store$: Store<any>) {}
}
