import { CommonModule } from "@angular/common";
import { CompanyNavbarContainer } from "./company-navbar.container";
import { ExpandOrCollapsePipe } from "../pipes/expand-or-collapse.pipe";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { NgModule } from "@angular/core";

const COMPONENTS: any = [CompanyNavbarContainer, ExpandOrCollapsePipe];

@NgModule({
    imports: [CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyNavbarModule {}
