import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { PortfolioNavbarContainerComponent } from "./portfolio-navbar.container.component";

const COMPONENTS: any = [PortfolioNavbarContainerComponent];

@NgModule({
    imports: [CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioNavbarModule {}
