import { CommonModule } from "@angular/common";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ComparisonBarComponent } from "@shared/comparison-bar/comparison-bar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { MaterialModule } from "@shared/material/material.module";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [ComparisonBarComponent],
    imports: [CommonModule, FlexLayoutModule, DropDownsModule, MaterialModule, IconizedSearchableComboModule],
    exports: [ComparisonBarComponent]
})
export class ComparisonBarModule {}
