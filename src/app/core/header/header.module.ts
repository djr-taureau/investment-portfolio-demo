import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent } from "@core/header/header.component";
import { HeaderContainer } from "@core/header/header.container";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { MaterialModule } from "@shared/material/material.module";
import { NgModule } from "@angular/core";

const COMPONENTS: any = [HeaderComponent, HeaderContainer];

@NgModule({
    imports: [CommonModule, IconizedSearchableComboModule, FlexLayoutModule, MaterialModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class HeaderModule {}
