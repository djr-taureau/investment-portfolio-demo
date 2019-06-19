import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { ValuationComponent } from "@shared/valuation/valuation.component";
import { MaterialModule } from "../material/material.module";

const COMPONENTS: any = [ValuationComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ValuationModule {}
