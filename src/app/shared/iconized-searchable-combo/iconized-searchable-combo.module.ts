import { CommonModule } from "@angular/common";
import { DirectivesModule } from "@shared/directives/directives.module";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { FormsModule } from "@angular/forms";
import { IconizedSearchableComboComponent } from "./iconized-searchable-combo.component";
import { LabelModule } from "@progress/kendo-angular-label";
import { MaterialModule } from "../material/material.module";
import { NgModule } from "@angular/core";
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    declarations: [IconizedSearchableComboComponent],
    imports: [CommonModule, DirectivesModule, FormsModule, DropDownsModule, LabelModule, MaterialModule],
    exports: [IconizedSearchableComboComponent]
})
export class IconizedSearchableComboModule {}
