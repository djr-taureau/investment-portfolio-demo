import { AppComponent } from "@app/app.component";
import { AppRoutingModule } from "@app/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "@core/core.module";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";

const MODULES = [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CoreModule, SharedModule];

const COMPONENTS = [AppComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: MODULES,
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
