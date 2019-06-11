import { of } from "rxjs";
import { Auth } from "../domain/auth.model";
import * as AuthActions from "../state/auth/auth.action";
import { AdalAuthContextService } from "./adal-auth-context.service";
import { AdalAuthConfig } from "./adal-auth.config";
import { AdalAuthService } from "./adal-auth.service";

class AdalAuthContextMock {
    constructor() {}
    login() {}
    logOut() {}
    handleWindowCallback() {}
    getCachedUser() {}
    getCachedToken() {}
    isCallback() {}
    getLoginError() {}
    acquireToken() {}
}

fdescribe("AdalAuthService", () => {
    let testSubject: AdalAuthService;
    let config: AdalAuthConfig;
    let store$;
    const context = new AdalAuthContextMock();

    const adalAuthContextService: AdalAuthContextService = {
        build() {
            return context;
        }
    };

    beforeEach(() => {
        // Spy on the NGRX Store so we can mock the `pipe()` and `dispatch()` methods.
        store$ = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);
        store$.pipe.and.returnValue(of(null));

        // Create the ADAL config object.
        config = {
            instance: "https://login.microsoftonline.com/",
            tenant: "softbank.com",
            clientId: "5694e2d0-946a-4fb3-8864-3e0914280d03",
            postLogoutRedirectUri: window.location.origin,
            cacheLocation: "localStorage", // enable this for IE, as sessionStorage does not work for localhost.
            restApiEndpoint: "https://prism-dev-api-management.azure-api.net/echo/resource",
            mockApiEndpoint: "https://prism-dev-api-management.azure-api.net/sbdevapi5"
        };

        // Create our test subject with mocks.
        testSubject = new AdalAuthService(config, adalAuthContextService, store$);
    });

    afterEach(() => {
        testSubject = null;

        // Reset the spy calls so we can return different values.
        store$.dispatch.calls.reset();
    });

    describe("Infrastructure >>", () => {
        it("Should create an instance.", () => {
            expect(testSubject).toBeTruthy();
        });
    });

    describe("login()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "login");
            testSubject.login();
            expect(context.login).toHaveBeenCalled();
        });

        it("Should return true.", (done) => {
            testSubject.login().subscribe((value) => {
                expect(value).toEqual(true);
                done();
            });
        });
    });

    describe("logout()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "logOut");
            testSubject.logout();
            expect(context.logOut).toHaveBeenCalled();
        });

        it("Should return true.", (done) => {
            testSubject.logout().subscribe((value) => {
                expect(value).toEqual(true);
                done();
            });
        });
    });

    describe("handleWindowCallback()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "handleWindowCallback");
            testSubject.handleWindowCallback();
            expect(context.handleWindowCallback).toHaveBeenCalled();
        });
    });

    describe("authContext()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            expect(testSubject.authContext).toEqual(context);
        });
    });

    describe("userInfo()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "getCachedUser");
            /* tslint:disable-next-line */
            testSubject.userInfo;
            expect(context.getCachedUser).toHaveBeenCalled();
        });
    });

    describe("accessToken()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "getCachedToken");
            /* tslint:disable-next-line */
            testSubject.accessToken;
            expect(context.getCachedToken).toHaveBeenCalled();
        });
    });

    describe("isAuthenticated()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "getCachedToken");
            const userInfoSpy = spyOnProperty(testSubject, "userInfo", "get");
            const accessTokenSpy = spyOnProperty(testSubject, "accessToken", "get");
            /* tslint:disable-next-line */
            testSubject.isAuthenticated;
            expect(userInfoSpy).toHaveBeenCalled();
        });
    });

    describe("isCallback()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "isCallback");
            testSubject.isCallback();
            expect(context.isCallback).toHaveBeenCalled();
        });
    });

    describe("getLoginError()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "getLoginError");
            testSubject.getLoginError();
            expect(context.getLoginError).toHaveBeenCalled();
        });
    });

    describe("getAccessToken()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            spyOn(context, "acquireToken");
            testSubject.getAccessToken(null, null);
            expect(context.acquireToken).toHaveBeenCalled();
        });
    });

    describe("checkAuth()", () => {
        it("Should dispatch LoginFault action when there's an error.", () => {
            const error = "error";
            spyOn(testSubject, "getLoginError").and.returnValue(error);
            spyOn(testSubject, "isCallback").and.returnValue(false);
            testSubject.checkAuth();

            expect(store$.dispatch.calls.argsFor(0)).toEqual([new AuthActions.LoginFault(error)]);
        });

        it("Should dispatch LoginSuccess action when there's no error and a token.", () => {
            const error: string = null;
            const accessToken = "token";
            const data: Auth = {
                idToken: accessToken
            };

            spyOn(testSubject, "getLoginError").and.returnValue(error);
            const accessTokenSpy = spyOnProperty(testSubject, "accessToken", "get").and.returnValue(accessToken);
            spyOn(testSubject, "isCallback").and.returnValue(false);
            testSubject.checkAuth();

            expect(store$.dispatch.calls.argsFor(0)).toEqual([new AuthActions.LoginSuccess(data)]);
        });

        it("Should not dispatch LoginSuccess action when there's no error and a token.", () => {
            const error: string = null;
            const accessToken: string = null;
            const data: Auth = {
                idToken: accessToken
            };

            spyOn(testSubject, "getLoginError").and.returnValue(error);
            const accessTokenSpy = spyOnProperty(testSubject, "accessToken", "get").and.returnValue(accessToken);
            spyOn(testSubject, "isCallback").and.returnValue(false);
            testSubject.checkAuth();

            expect(store$.dispatch).not.toHaveBeenCalled();
        });

        it("Should call 'handleWindowCallback()' when we're in a callback from ADAL auth.", () => {
            const error: string = null;
            spyOn(testSubject, "getLoginError").and.returnValue(error);
            spyOn(testSubject, "isCallback").and.returnValue(true);
            spyOn(testSubject, "handleWindowCallback");
            testSubject.checkAuth();

            expect(testSubject.handleWindowCallback).toHaveBeenCalled();
        });
    });
});
