import { Inject, Injectable } from "@angular/core";
import { ConfigService } from "@core/service/config.service";
import { Store } from "@ngrx/store";
import { Observable, of, Subscriber } from "rxjs";
import { filter, first, retry } from "rxjs/operators";
import { Logger } from "@util/logger";
import { Auth } from "@core/domain/auth.model";
import { adal } from "adal-angular";
import { AdalAuthContextService } from "./adal-auth-context.service";
import { AdalAuthConfig } from "./adal-auth.config";
import { AdalAuthConfigService } from "./auth-config.service";
import { IAuthService } from "./auth-service.interface";
import * as AuthActions from "@core/state/auth/auth.action";
import * as StringUtil from "@util/string.util";

@Injectable({
    providedIn: "root"
})
export class AdalAuthService implements IAuthService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AdalAuthService");

    /**
     * Reference to the ADAL library's auth context.
     */
    private context: adal.AuthenticationContext;

    /**
     * Constructor.
     * @param config
     * @param adalAuthContextService
     * @param configService
     * @param store$
     */
    constructor(
        @Inject(AdalAuthConfigService) private config: AdalAuthConfig,
        private adalAuthContextService: AdalAuthContextService,
        private configService: ConfigService,
        private store$: Store<any>
    ) {
        AdalAuthService.logger.debug(`constructor()`);
        this.init();
    }

    /**
     * Initializes the ADAL Authentication Context.
     */
    private init() {
        AdalAuthService.logger.debug(`init()`);

        this.configService
            .getConfig()
            .pipe(
                filter((config) => config.initialized),
                first()
            )
            .subscribe(() => {
                AdalAuthService.logger.debug(`init( Build ADAL Context. )`);
                // Create an instance of the ADAL auth context.
                this.context = this.adalAuthContextService.build(this.config);
            });
    }

    /**
     * Calls the ADAL API to login.
     *
     * Theoretically we don't even need to return an observable as we'll leave the app
     * to perform ADAL authentication via another web site hosted by MS, but for testing
     * and completeness we'll return one.
     */
    public login(): Observable<boolean> {
        AdalAuthService.logger.debug(`login()`);
        this.context.login();
        return of(true);
    }

    /**
     * Calls the ADAL API to logout.
     *
     * Theoretically we don't even need to return an observable as we'll leave the app
     * to perform ADAL authentication via another web site hosted by MS, but for testing
     * and completeness we'll return one.
     */
    public logout(): Observable<boolean> {
        AdalAuthService.logger.debug(`logout()`);
        this.context.logOut();
        return of(true);
    }

    /**
     * Handles the callback to the SPA from the ADAL auth provider.
     *
     * In ADAL JS, you will have to explicitly call the handleWindowCallback method on page load to handle the response
     * from the server in case of redirect flows like login without popup and acquireTokenRedirect. There is no need
     * to call this function for popup flows like loginPopup and acquireTokenPopup. This method must be called for
     * processing the response received from AAD. It extracts the hash, processes the token or error, saves it in
     * the cache and calls the registered callback function in your initialization with the result.
     */
    public handleWindowCallback(): void {
        AdalAuthService.logger.debug(`handleWindowCallback()`);
        this.context.handleWindowCallback();
    }

    /**
     * Accessor to the ADAL Auth context.
     */
    public get authContext(): adal.AuthenticationContext {
        return this.context;
    }

    /**
     * Details regarding the user.
     */
    public get userInfo(): any {
        return this.context.getCachedUser();
    }

    /**
     * Accessor to the access token.
     */
    public get accessToken(): string {
        return this.context.getCachedToken(this.config.clientId);
    }

    /**
     * Accessor indicating if the user is auth'd.
     */
    public get isAuthenticated(): boolean {
        return !!this.userInfo && !!this.accessToken;
    }

    /**
     * Accessor to the access token.
     */
    public isCallback(hash?: string): boolean {
        hash = hash || window.location.hash;
        return this.context.isCallback(hash);
    }

    /**
     * Accessor to the login error.
     */
    public getLoginError(): string {
        return this.context.getLoginError();
    }

    /**
     * @param endpoint
     * @param callbacks
     */
    public getAccessToken(endpoint: string, callbacks: (message: string, token: string) => any) {
        return this.context.acquireToken(endpoint, callbacks);
    }

    /**
     * TODO: BMR: 06/05/2019: This needs work and I need to read the SDK docs to see what this was supposed to do as I stole it from other.
     * @param resource
     */
    public acquireTokenResilient(resource: string): Observable<any> {
        AdalAuthService.logger.debug(`acquireTokenResilient( ${resource} )`);
        return new Observable<any>((subscriber: Subscriber<any>) =>
            this.context.acquireToken(resource, (message: string, token: string) => {
                if (token) {
                    subscriber.next(token);
                } else {
                    AdalAuthService.logger.warn(`acquireTokenResilient( ${message} )`);
                    subscriber.error(message);
                }
            })
        ).pipe(retry(3));
    }

    /**
     * Determine if the user is authenticated.
     */
    public checkAuth(): void {
        AdalAuthService.logger.debug(`checkAuth()`);

        const error = this.getLoginError();
        const isCallback = this.isCallback();

        // Determine if we're successfully auth'd or there was an auth error.
        if (error) {
            AdalAuthService.logger.warn(`loginFault( Error: ${error} )`);
            this.store$.dispatch(new AuthActions.LoginFault(error));
        } else {
            const accessToken = this.accessToken;
            AdalAuthService.logger.debug(`loginSuccess( accessToken: ${StringUtil.truncate(accessToken, 10)} )`);

            // If we've got a legit token in hand save it in the NGRX store.
            if (accessToken) {
                const data: Auth = {
                    idToken: accessToken
                };
                this.store$.dispatch(new AuthActions.LoginSuccess(data));
            }
        }

        if (isCallback) {
            // Tell the ADAL lib to redirect back to the expected callback
            this.handleWindowCallback();
        }
    }
}
