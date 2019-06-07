import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { FooterModule } from "./shared/footer/footer.module";
import { HeaderModule } from "./shared/header/header.module";
import { SharedModule } from "./shared/shared.module";
import { SlideoutModule } from "./shared/slideout/slideout.module";

xdescribe("AppComponent", () => {
    // Spy on the NGRX Store so we can mock the `pipe()` and `dispatch()` methods.
    const store$ = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HeaderModule, FooterModule, SharedModule, SlideoutModule],
            declarations: [AppComponent],
            providers: [
                {
                    provide: Store,
                    useValue: store$
                }
            ]
        }).compileComponents();
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
