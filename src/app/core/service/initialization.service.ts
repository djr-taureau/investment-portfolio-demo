import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Logger } from "../../util/logger";
import { AuthService } from "../auth/auth.service";
import * as AuthActions from "../state/auth/auth.action";

@Injectable({
    providedIn: "root"
})
export class InitializationService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("InitializationService");

    /**
     * Flag indicating if the service is initialized.
     */
    private initialized = false;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>, private authService: AuthService) {
        InitializationService.logger.debug(`Constructor()`);
    }

    /**
     * Initializes the app by getting the list of applicant search history items and
     * starts the applicant search status polling.
     */
    public init(): Observable<boolean> {
        if (!this.initialized) {
            InitializationService.logger.debug(`init()`);
            this.initialized = true;

            this.authService.checkAuth();

            if (!this.authService.isAuthenticated) {
                this.store$.dispatch(new AuthActions.Login());
            }
        }

        return of(true);
    }
}
