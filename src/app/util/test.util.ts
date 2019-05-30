import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Company } from "../core/domain/company.model";

/**
 * Provides unit tests access to DOM elements by element ID or CSS selector in a component's fixture.
 * @param fixture
 * @param id
 * @param useCss
 */
const getElement = (fixture: ComponentFixture<any>, id: string, useCss: boolean = false): any => {
    const target: string = useCss ? id : `#${id}`;
    const el: DebugElement = fixture.debugElement.query(By.css(target));
    return el ? el.nativeElement : null;
};

/**
 * Provides unit tests access to DOM elements by ID in a component's fixture.
 * @param fixture
 * @param id
 */
export const getElementById = (fixture: ComponentFixture<any>, id: string): any => {
    return getElement(fixture, id, false);
};

/**
 * Provides unit tests access to DOM elements by CSS selector in a component's fixture.
 * @param fixture
 * @param clazz
 */
export const getElementByCss = (fixture: ComponentFixture<any>, clazz: string): any => {
    return getElement(fixture, clazz, true);
};

/**
 * Fires off a DOM select element's "change" event and then forces a change detection
 * cycle to run in the parent component in unit tests.
 * @param select
 * @param fixture
 * @param index
 */
export const changeSelectFormElementValue = (select, fixture, index) => {
    select.value = select.options[index].value;
    select.dispatchEvent(new Event("change"));
    fixture.detectChanges();
};

/**
 * Creates a default Company.
 */
export const getCompanyDefault = (): Company => {
    return {
        companyUpdates: [],
        data: null,
        dealTeam: [],
        deployed: 0,
        description: "",
        id: "",
        initiatives: [],
        IRR: 0,
        logo: "",
        MOIC: 0,
        name: "",
        percentOwnership: "0",
        revenue: [],
        score: 0,
        sector: [],
        tags: [],
        takeawayDate: "",
        takeaways: [],
        type: "",
        valuation: null
    };
};

/**
 * Creates a fully populated Company using default values for properties
 * or those passed in as a Partial.
 *
 * Used for mocking Company objects.
 *
 * @param partial
 */
export const getCompanyMock = (partial?: Partial<Company>): Company => ({
    ...getCompanyDefault(),
    ...partial
});

/**
 * Generates a File object that can be used for testing.
 * @param content
 * @param name
 */
export const createMockFile = (content?: string[], name?: string): File => {
    content = content || ["foo"];
    name = name || "bar.txt";
    return new File(content, name);
};
