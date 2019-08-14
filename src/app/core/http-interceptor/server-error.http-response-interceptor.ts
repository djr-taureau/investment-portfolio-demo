import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiErrorEnum } from "@core/domain/api.model";
import * as AuthActions from "@core/state/auth/auth.action";
import { Store } from "@ngrx/store";
import { EMPTY, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Logger } from "@util/logger";
import * as HttpStatus from "http-status";
import * as SnackBarActions from "@core/state/snackbar/snackbar.action";

@Injectable()
export class ServerErrorHttpResponseInterceptor implements HttpInterceptor {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ServerErrorHttpResponseInterceptor");

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        ServerErrorHttpResponseInterceptor.logger.debug(`Constructor()`);
    }

    /**
     * Intercepts all HTTP responses determines if the server threw an error, aka not a HTTP 200; if yes we throw an error.
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            // TODO: BMR: Can we ditch tap() and use catchError()?
            // catchError()
            tap(
                // This is required for the `next()` callback function so we can add a second
                // params callback for the error
                (event: HttpEvent<any>) => {},
                // Actual error handler callback where we check for an authentication error (aka bad token).
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (this.isAuthError(err)) {
                            this.createAuthError(err);
                        } else {
                            // Removing per SBMVP-923
                            // this.store$.dispatch(new SnackBarActions.Open(this.getErrorMessage(err)));
                            return EMPTY;
                        }
                    }
                    // TODO: BMR: Does this ever hit?
                    return next.handle(request);
                }
            )
        );
    }

    /**
     * Determines if the the response is an authentication error.
     * @param httpErrorResponse
     */
    private isAuthError(httpErrorResponse: HttpErrorResponse): boolean {
        const isLoginAttempt: boolean = httpErrorResponse.url.indexOf("auth/login") >= 0;
        const isUnauthorized: boolean = httpErrorResponse.status === HttpStatus.UNAUTHORIZED;
        return !isLoginAttempt && isUnauthorized;
    }

    /**
     * Forces the user to re-authenticate by logging attempting to login again.
     */
    private createAuthError(httpErrorResponse: HttpErrorResponse): void {
        ServerErrorHttpResponseInterceptor.logger.warn(`createAuthError( The token was invalid so we're redirecting the user back to login. )`);
        const msg = "Your session has expired. Please login again.";
        this.store$.dispatch(new SnackBarActions.Open(msg));
        this.store$.dispatch(new AuthActions.Login());
    }

    /**
     * Accessor for the error message.
     * @param err
     */
    private getErrorMessage(err: HttpErrorResponse): string {
        const defaultErrMessage: string = err.message;
        const detailedErrMessage: string = err.error.message;
        const errMsg: string = detailedErrMessage ? detailedErrMessage : defaultErrMessage;

        // In the event that the error is unknown we'll display a known message.
        return errMsg.indexOf(ApiErrorEnum.unknown) <= -1 ? errMsg : "Technical Difficulties. Please try again later.";
    }
}
