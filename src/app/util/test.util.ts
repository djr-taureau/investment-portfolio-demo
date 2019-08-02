import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { PortfolioTableItem } from "@app/core/domain/portfolio-table-item.model";
import { Company, CompanyTypeEnum, Tag, Takeaway, Team, TeamMember } from "@core/domain/company.model";

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
        aka: "",
        ceo: "",
        revenueStage: "",
        invested: 0,
        availablePeriods: [],
        defaultCurrency: { currencyCode: "USD", currencySymbol: "$" },
        boardMembers: [],
        companyUpdates: [],
        totalValue: 0,
        data: null,
        deployed: 0,
        deployedTotal: 0,
        description: "",
        fdOwnership: "",
        fiscalYearEnd: null,
        foundedDate: "",
        founders: [],
        funds: [],
        fund: "",
        lastFollowOn: "",
        internalTicker: "",
        headquarters: null,
        id: "1",
        initialInvestment: "",
        initiatives: [],
        investingEntity: "",
        irr: 0,
        latestFollowOnDate: "",
        logo: "",
        moic: 0,
        name: "",
        percentOwnership: 0,
        region: "",
        revenue: [],
        score: 0,
        sectors: [],
        slackName: "",
        slackUrl: "",
        stage: "",
        tags: [],
        takeawayDate: "",
        teamLead: "",
        takeaways: [],
        type: CompanyTypeEnum.PUBLIC,
        // valuation: null,
        website: ""
    };
};

/**
 * Creates a default TeamMember.
 */
export const getTeamMemberDefault = (): TeamMember => {
    return {
        id: "",
        companyName: "",
        name: "",
        firstName: "",
        lastName: "",
        initials: "",
        avatar: "",
        slack: "",
        mobile: "",
        email: "",
        bio: "",
        position: "",
        companyRelationships: [],
        teamLead: false,
        boardMember: false
    };
};

export const getPortfolioTableItemDefault = (): PortfolioTableItem => {
    return {
        logo: "",
        companyId: "",
        companyName: "",
        teamLeadAvatar: "",
        teamLeadName: "",
        sectors: [],
        region: "",
        countryFlag: "",
        country: "",
        invested: 0,
        totalValue: 0,
        moic: 0,
        irr: 0,
        type: CompanyTypeEnum.PRIVATE
    };
};

/**
 * Creates a deafault Team
 */
export const getTeamDefault = (): Team => {
    return {
        groups: [
            {
                category: "",
                members: [
                    {
                        id: "",
                        companyName: "",
                        name: "",
                        firstName: "",
                        lastName: "",
                        initials: "",
                        avatar: "",
                        slack: "",
                        mobile: "",
                        email: "",
                        bio: "",
                        position: "",
                        companyRelationships: [],
                        teamLead: false,
                        boardMember: false
                    }
                ]
            }
        ]
    };
};

/**
 * Creates a default Tag.
 */
export const getTagDefault = (): Tag => {
    return {
        id: "",
        name: ""
    };
};

export const getTeamMock = (partial?: Partial<Team>): Team => ({
    ...getTeamDefault(),
    ...partial
});

/**
 * Creates a default Takeaway.
 */
export const getTakeawayDefault = (): Takeaway => {
    return {
        id: "",
        content: ""
    };
};

/**
 * Creates a fully populated TeamMember using default values for properties
 * or those passed in as a Partial.
 *
 * Used for mocking TeamMember objects.
 *
 * @param defaultMock
 * @param partial
 */
export const getMock = (defaultMock: any, partial?: Partial<any>): any => ({
    ...defaultMock(),
    ...partial
});

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

export const getPortfolioTableItemMock = (partial?: Partial<PortfolioTableItem>): PortfolioTableItem => ({
    ...getPortfolioTableItemDefault(),
    ...partial
});
