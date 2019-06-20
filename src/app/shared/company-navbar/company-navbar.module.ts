import { CommonModule } from "@angular/common";
import { CompanyNavbarContainer } from "./company-navbar.container";
import { ExpandOrCollapsePipe } from "../pipes/expand-or-collapse.pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { NgModule } from "@angular/core";

const COMPONENTS: any = [CompanyNavbarContainer, ExpandOrCollapsePipe];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyNavbarModule {}
