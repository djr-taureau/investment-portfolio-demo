import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CompanyDetailContainer } from "./company-detail-container";

describe("CompanyDetailContainer", () => {
    let component: CompanyDetailContainer;
    let fixture: ComponentFixture<CompanyDetailContainer>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanyDetailContainer]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyDetailContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
