import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { EMPTY, Observable, of } from "rxjs";
import { first, mergeMap } from "rxjs/operators";
import { appRoutePaths } from "../../app.routes";
import { Logger } from "../../util/logger";
import { ApiEndpointService } from "../service/api-endpoint.service";
import * as fromState from "../state";
import * as RouterActions from "../state/router/router.action";

@Injectable()
export class AddTokenHeaderHttpRequestInterceptor implements HttpInterceptor {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AddTokenHeaderHttpRequestInterceptor");

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {}

    /**
     * Intercepts all HTTP requests and adds the JWT token to the request's header if the URL
     * is a REST endpoint and not login or logout.
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiEndpoint: boolean = ApiEndpointService.isApiEndpoint(request.url);
        const isAuthEndpoint: boolean = ApiEndpointService.isAuthEndpoint(request.url);
        const isSecureEndpoint: boolean = ApiEndpointService.isSecureEndpoint(request.url);
        const isMockRoute: boolean = ApiEndpointService.isMockRoute(window.location.href);
        const isTokenizeableEndpoint: boolean = isApiEndpoint && isSecureEndpoint && !isAuthEndpoint && !isMockRoute;

        // NOTE: We do not want to add the token to anything but REST endpoints that aren't
        // login or logout.
        if (isTokenizeableEndpoint) {
            return this.addToken(request).pipe(mergeMap((requestWithToken: HttpRequest<any>) => next.handle(requestWithToken)));
        } else {
            return next.handle(request);
        }
    }

    /**
     * Adds the JWT token to the request's header.
     */
    private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
        // NOTE: DO NOT try to immediately setup this selector in the constructor or as an assignment in a
        // class member variable as there's no stores available when this interceptor fires fires up and
        // as a result it'll throw a runtime error.
        //
        // NOTE: These 2 pipes are required for proper unit testing...If we do all of the work in a
        // single pipe we have no way of mocking it or spying on it, so we break the work up
        // into two:
        // 1) First pipe simply provides access to the store data via a selector function.
        // 2) Second pipe performs the logic to add or not add the token to the request.
        // Again, if we do all of this in just one pipe we can't actually test the token logic.
        return this.store$.pipe(select(fromState.getIdToken)).pipe(
            first(),
            mergeMap((token: string) => {
                if (token) {
                    request = request.clone({
                        headers: request.headers.set("Authorization", `Bearer ${token}`)

                        // NOTE: This line makes the request die after the OPTIONS request. I left
                        // it commented out here as a warning as this is usually required to hit secure
                        // endpoints with tokens...not sure why our API Gateway simple swallows the request
                        // if it's included instead of kicking back a 403 or similar.
                        // withCredentials: true
                    });
                } else {
                    AddTokenHeaderHttpRequestInterceptor.logger.warn(
                        `addToken( The token was invalid so we're redirecting the user back to login. Invalid request: ${request.url} )`
                    );
                    this.store$.dispatch(new RouterActions.Go({ path: appRoutePaths.login }));

                    // TODO: BMR: 04/25/2019: Come back to this as the comment is vlaid for unit tests but not at runtime in real app.
                    // NOTE: We cannot return an empty observable and must always return the legit request object
                    // wrapped in an observable to complete the stream. Keeping the following commented out lines
                    // here for reference and context.
                    //
                    return EMPTY; // -- BAD
                    // return of(null); -- BAD
                }
                return of(request);
            })
        );
    }
}
