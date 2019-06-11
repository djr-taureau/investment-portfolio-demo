import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconizedSearchableComboComponent } from "./iconized-searchable-combo.component";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { MaterialModule } from "../material/material.module";
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    declarations: [IconizedSearchableComboComponent],
    imports: [CommonModule, FormsModule, DropDownsModule, LabelModule, MaterialModule],
    exports: [IconizedSearchableComboComponent]
})
export class IconizedSearchableComboModule {}
