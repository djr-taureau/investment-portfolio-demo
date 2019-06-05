import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PortfolioNavbarContainerComponent } from "./portfolio-navbar.container.component";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [PortfolioNavbarContainerComponent];

@NgModule({
    imports: [CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioNavbarModule {}
