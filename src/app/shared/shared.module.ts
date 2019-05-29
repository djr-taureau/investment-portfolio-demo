import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterModule } from "./footer/footer.module";
import { HeaderModule } from "./header/header.module";
import { MaterialModule } from "./material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SlideoutModule } from "./slideout/slideout.module";

const MODULES = [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd Party Modules
    FlexLayoutModule,

    // Application Shared Feature Modules
    HeaderModule,
    FooterModule,
    MaterialModule,
    SlideoutModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    declarations: []
})
export class SharedModule {}
