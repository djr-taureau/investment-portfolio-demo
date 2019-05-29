import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CompanyDetailContainerComponent } from "./company-detail-container";

describe("CompanyDetailContainerComponent", () => {
    let component: CompanyDetailContainerComponent;
    let fixture: ComponentFixture<CompanyDetailContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanyDetailContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyDetailContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
