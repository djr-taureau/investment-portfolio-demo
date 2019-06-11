import { of } from "rxjs";
import { AdalAuthService } from "./adal-auth.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let testSubject: AuthService;
    let adalAuthService;

    beforeEach(() => {
        adalAuthService = jasmine.createSpyObj("AdalAuthService", ["login", "logout", "checkAuth"]);
        adalAuthService.login.and.returnValue(of(true));
        adalAuthService.logout.and.returnValue(of(true));

        testSubject = new AuthService(adalAuthService);
    });

    afterEach(() => {
        testSubject = null;
    });

    describe("Infrastructure >>", () => {
        it("Should create an instance.", () => {
            expect(testSubject).toBeTruthy();
        });
    });

    describe("login()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            testSubject.login();
            expect(adalAuthService.login).toHaveBeenCalled();
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
            testSubject.logout();
            expect(adalAuthService.logout).toHaveBeenCalled();
        });

        it("Should return true.", (done) => {
            testSubject.logout().subscribe((value) => {
                expect(value).toEqual(true);
                done();
            });
        });
    });

    describe("checkAuth()", () => {
        it("Should call underlying authentication service implementation's method.", () => {
            testSubject.checkAuth();
            expect(adalAuthService.checkAuth).toHaveBeenCalled();
        });
    });
});
