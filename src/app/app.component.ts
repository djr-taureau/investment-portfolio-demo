import * as fromState from "./core/state/";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { slideFromRight } from "./shared/animations/slide.animations";
import { Logger } from "./util/logger";
@Component({
    selector: "sbp-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [slideFromRight]
})
export class AppComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AppComponent");

    public showSlideout$: Observable<boolean>;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        AppComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.showSlideout$ = this.store$.pipe(select(fromState.getShowSlideout));
    }
}
