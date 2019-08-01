import { CommonModule } from "@angular/common";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ExpandablePanelComponent } from "@shared/expandable-panel/expandable-panel.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { MaterialModule } from "@shared/material/material.module";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [ExpandablePanelComponent],
    imports: [CommonModule, FlexLayoutModule, DropDownsModule, MaterialModule, IconizedSearchableComboModule],
    exports: [ExpandablePanelComponent]
})
export class ExpandablePanelModule {}
