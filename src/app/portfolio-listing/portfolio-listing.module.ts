import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioListingComponent } from "./portfolio-listing.component";
import { PortfolioListingContainerComponent } from "./portfolio-listing.container.component";

const COMPONENTS: any = [PortfolioListingContainerComponent, PortfolioListingComponent];
const PORTFOLIO_COMPANIES_ROUTES: Routes = [
    {
        path: "",
        component: PortfolioListingContainerComponent
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(PORTFOLIO_COMPANIES_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioListingModule {}
