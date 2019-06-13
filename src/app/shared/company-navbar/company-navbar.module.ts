import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExpandOrCollapsePipe } from "../pipes/expand-or-collapse.pipe";
import { CompanyNavbarContainer } from "./company-navbar.container";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [CompanyNavbarContainer, ExpandOrCollapsePipe];

@NgModule({
    imports: [CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyNavbarModule {}
