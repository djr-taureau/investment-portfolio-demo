import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PortfolioNavbarContainer } from "./portfolio-navbar.container";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [PortfolioNavbarContainer];

@NgModule({
    imports: [CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioNavbarModule {}
