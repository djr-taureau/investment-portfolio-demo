import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IconizedSearchableComboComponent } from "./iconized-searchable-combo.component";
import { IconizedSearchableComboModule } from "./iconized-searchable-combo.module";

describe("IconizedSearchableComboComponent", () => {
    let component: IconizedSearchableComboComponent;
    let fixture: ComponentFixture<IconizedSearchableComboComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IconizedSearchableComboModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconizedSearchableComboComponent);
        component = fixture.componentInstance;
        component.listItems = [{ id: 0, icon: "assets/image/nauset.jpg", text: "nauset" }, { id: 1, icon: "assets/image/notes.jpg", text: "notes" }];
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have 2 list items", () => {
        expect(component.data.length).toEqual(2);
    });
});
