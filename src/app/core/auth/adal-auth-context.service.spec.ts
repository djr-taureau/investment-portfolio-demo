import { AdalAuthContextService } from "./adal-auth-context.service";

describe("AdalAuthContextService", () => {
    let testSubject: AdalAuthContextService;

    beforeEach(() => {
        testSubject = new AdalAuthContextService();
    });

    afterEach(() => {
        testSubject = null;
    });

    describe("Infrastructure >>", () => {
        it("Should create an instance.", () => {
            expect(testSubject).toBeTruthy();
        });
    });
});
