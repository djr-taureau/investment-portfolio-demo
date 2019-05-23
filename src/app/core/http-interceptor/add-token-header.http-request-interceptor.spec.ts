import { HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { appRoutePaths } from "../../app.routes";
import { AddTokenHeaderHttpRequestInterceptor } from "./add-token-header.http-request-interceptor";
import * as RouterActions from "../state/router/router.action";

xdescribe("HTTP Interceptor: AddTokenHeaderHttpRequestInterceptor >>", () => {
    let testSubject: AddTokenHeaderHttpRequestInterceptor;

    // Spy on the NGRX Store so we can mock the `pipe()` and `dispatch()` methods.
    const store$ = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Create some expected test data.
    const testToken = "testToken";
    const okResponse = of({ hello: "world" });

    beforeEach(() => {
        // NOTE: This is important to note as we're testing the HTTP interceptor outside the scope of
        // Angular as if it was a normal JS class.
        testSubject = new AddTokenHeaderHttpRequestInterceptor(store$);

        // Unnecessary but here for posterity. See NOTE above for explanation.
        // TestBed.configureTestingModule({
        //     imports: [HttpClientTestingModule],
        //     providers: [
        //         {
        //             provide: HTTP_INTERCEPTORS,
        //             useClass: AddTokenHeaderHttpRequestInterceptor,
        //             multi: true
        //         }
        //     ]
        // });
    });

    afterEach(() => {
        testSubject = null;
    });

    describe("Infrastructure >>", () => {
        it("Should be created", () => {
            expect(testSubject).toBeTruthy();
        });
    });

    describe("No Auth Header >>", () => {
        it("Should not add the header for '/auth' endpoint.", (done) => {
            const next: any = {
                handle: (request: HttpRequest<any>) => {
                    expect(request.headers.has("Authorization")).toBeFalsy();
                    return okResponse;
                }
            };
            const req = new HttpRequest<any>("GET", "/auth");
            testSubject.intercept(req, next).subscribe((obj) => done());
        });

        it("Should not add the header for '/config.json' endpoint.", (done) => {
            const next: any = {
                handle: (request: HttpRequest<any>) => {
                    expect(request.headers.has("Authorization")).toBeFalsy();
                    return okResponse;
                }
            };
            const req = new HttpRequest<any>("GET", "config.json");
            testSubject.intercept(req, next).subscribe((obj) => done());
        });

        it("Should not add the header when the token is falsy and should dispatch a login action.", (done) => {
            // Force the store selector for the token to return a falsy value
            // so we can test that a bad token means we don't add it to the header.
            store$.pipe.and.returnValue(of(null));

            const next: any = {
                handle: (request: HttpRequest<any>) => {
                    expect(request.headers.has("Authorization")).toBeFalsy();
                    expect(store$.dispatch.calls.argsFor(0)).toEqual([new RouterActions.Go({ path: appRoutePaths.login })]);
                    return okResponse;
                }
            };
            const req = new HttpRequest<any>("GET", "api/");
            testSubject.intercept(req, next).subscribe((obj) => done());
        });
    });

    describe("Add Auth Header >>", () => {
        it("Should add the header with the correct value.", (done) => {
            // Make the store selector for the token return a valid value.
            store$.pipe.and.returnValue(of(testToken));

            const next: any = {
                handle: (request: HttpRequest<any>) => {
                    expect(request.headers.has("Authorization")).toBeTruthy();
                    expect(request.headers.get("Authorization")).toEqual(`Bearer ${testToken}`);
                    return okResponse;
                }
            };
            const req = new HttpRequest<any>("GET", "api/");
            testSubject.intercept(req, next).subscribe((obj) => done());
        });
    });
});
