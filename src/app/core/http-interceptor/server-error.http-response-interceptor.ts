import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { EMPTY, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Logger } from "../../util/logger";

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
                        // TODO: BMR: 05/08/2019: Need a legit modal for errors.
                        alert(err.error.message);
                        return EMPTY;
                    }
                    // TODO: BMR: Does this ever hit?
                    return next.handle(request);
                }
            )
        );
    }
}
