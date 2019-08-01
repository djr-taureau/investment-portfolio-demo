import { AuthService } from "@core/auth/auth.service";
import { InitializationService } from "@core/service/initialization.service";
import * as fromState from "@core/state/";
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { simpleFade } from "@shared/animations/fade.animations";
import { Observable } from "rxjs";
import { slideFromRight } from "@shared/animations/slide.animations";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [slideFromRight, simpleFade]
})
export class AppComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AppComponent");

    /**
     * Flag indicating if the slide-out is visible.
     */
    public showSlideout$: Observable<boolean>;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>, private initializationService: InitializationService) {
        AppComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        AppComponent.logger.debug(`ngOnInit()`);
        this.showSlideout$ = this.store$.pipe(select(fromState.getShowSlideout));

        this.initializationService.init();
    }
}
