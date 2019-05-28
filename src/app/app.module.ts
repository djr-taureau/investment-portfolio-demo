import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";
import { NgModule } from "@angular/core";
import { SharedModule } from "./shared/shared.module";
import { SlideoutModule } from "./shared/slideout/slideout.module";
import { CompanyInfoModule } from "./slideout-routes/company-info/company-info.module";

const MODULES = [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CoreModule, SharedModule, SlideoutModule];

const COMPONENTS = [AppComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: MODULES,
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
