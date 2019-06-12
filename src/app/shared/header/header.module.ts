import { FlexLayoutModule } from "@angular/flex-layout";
import { IconizedSearchableComboModule } from "./../iconized-searchable-combo/iconized-searchable-combo.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { HeaderComponent } from "./header.component";
import { HeaderContainer } from "./header.container";

const COMPONENTS: any = [HeaderComponent, HeaderContainer];

@NgModule({
    imports: [CommonModule, MaterialModule, IconizedSearchableComboModule, FlexLayoutModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class HeaderModule {}
