import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "app/shared/shared.module";
import { CompanyDetailContainer } from "./company-detail-container";
import { CompanyDetailComponent } from "./company-detail-component";

const MODULES: any = [CommonModule, SharedModule];

const COMPONENTS: any = [CompanyDetailComponent, CompanyDetailContainer];
@NgModule({
    declarations: COMPONENTS,
    imports: MODULES,
    exports: COMPONENTS
})
export class CompanyDetailModule {}
