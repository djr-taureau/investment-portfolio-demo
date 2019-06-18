import { ExpandOrCollapsePipe } from "./expand-or-collapse.pipe";

describe("Pipe: ExpandOrCollapsePipe >>", () => {
    let testSubject: ExpandOrCollapsePipe;
    const collapseLabel = "Collapse";
    const expandLabel = "Expand";

    beforeEach(() => {
        testSubject = new ExpandOrCollapsePipe();
    });

    afterEach(() => {
        testSubject = null;
    });

    describe("Infrastructure >>", () => {
        it("Should be created", () => {
            expect(testSubject).toBeTruthy();
        });
    });

    describe("Return 'Collapse' >>", () => {
        it("A falsy first param should return 'Collapse'", () => {
            expect(testSubject.transform(null)).toEqual(collapseLabel);
            expect(testSubject.transform(undefined)).toEqual(collapseLabel);
            expect(testSubject.transform(false)).toEqual(collapseLabel);
        });
    });

    describe("Return 'Expand' >>", () => {
        it("A truthy first param should return 'Expand'", () => {
            expect(testSubject.transform(true)).toEqual(expandLabel);
        });
    });
});
