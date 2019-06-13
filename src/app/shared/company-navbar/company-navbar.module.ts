import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CompanyNavbarContainer } from "./company-navbar.container";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [CompanyNavbarContainer];

@NgModule({
    imports: [CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyNavbarModule {}
