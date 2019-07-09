import { CommonModule } from "@angular/common";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { FilterablePanelComponent } from "@shared/filterable-panel/filterable-panel.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { MaterialModule } from "@shared/material/material.module";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [FilterablePanelComponent],
    imports: [CommonModule, FlexLayoutModule, DropDownsModule, MaterialModule, IconizedSearchableComboModule],
    exports: [FilterablePanelComponent]
})
export class FilterablePanelModule {}
