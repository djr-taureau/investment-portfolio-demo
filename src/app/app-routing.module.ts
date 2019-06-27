import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import * as AppRoutes from "@app/app.routes";

const PROVIDERS = [
    {
        provide: APP_BASE_HREF,
        useValue: "/"
    }
];

const routes: Routes = [
    //////////////////////////////////////////////////
    // Unprotected Routes
    //////////////////////////////////////////////////
    // {
    //     path: AppRoutes.appRoutePaths.login,
    //     loadChildren: "./auth/login/login.module#LoginModule"
    // },
    // {
    //     path: AppRoutes.appRoutePaths.register,
    //     loadChildren: "./auth/register/register.module#RegisterModule"
    // },
    // {
    //     path: AppRoutes.appRoutePaths.changePassword,
    //     loadChildren: "./auth/change-password/change-password.module#ChangePasswordModule"
    // },
    //////////////////////////////////////////////////
    // Protected Routes
    //////////////////////////////////////////////////
    // {
    //     path: AppRoutes.appRoutePaths.foo,
    //     loadChildren: "./product/product.module#FooModule",
    //     canActivate: [AuthRouteGuard]
    // },
    { path: "", redirectTo: "/portfolio-listing", pathMatch: "full" },
    //////////////////////////////////////////////////
    // TOP-LEVEL PORTFOLIO ROUTES
    //////////////////////////////////////////////////
    {
        path: AppRoutes.appRoutePaths.portfolioListing,
        loadChildren: "./portfolio-listing/portfolio-listing.module#PortfolioListingModule"
    },
    {
        path: AppRoutes.appRoutePaths.portfolioDashboard,
        loadChildren: "./portfolio-dashboard/portfolio-dashboard.module#PortfolioDashboardModule"
    },

    //////////////////////////////////////////////////
    // COMPANY ROUTES
    //////////////////////////////////////////////////
    {
        path: AppRoutes.appRoutePaths.companyDashboard,
        loadChildren: "./company-dashboard/company-dashboard.module#CompanyDashboardModule"
    },
    {
        path: AppRoutes.appRoutePaths.companyDocuments,
        loadChildren: "./company-documents/company-documents.module#CompanyDocumentsModule"
    },
    {
        path: AppRoutes.appRoutePaths.companyFinancials,
        loadChildren: "./company-financials/company-financials.module#CompanyFinancialsModule"
    },
    {
        path: AppRoutes.appRoutePaths.companyInitiatives,
        loadChildren: "./company-initiatives/company-initiatives.module#CompanyInitiativesModule"
    },
    {
        path: AppRoutes.appRoutePaths.companyNotes,
        loadChildren: "./company-notes/company-notes.module#CompanyNotesModule"
    },
    {
        path: AppRoutes.appRoutePaths.companyValuation,
        loadChildren: "./company-valuation/company-valuation.module#CompanyValuationModule"
    },
    //////////////////////////////////////////////////
    // SLIDEOUT ROUTES
    //////////////////////////////////////////////////
    {
        path: AppRoutes.appRoutePaths.companyInfo,
        loadChildren: "./slideout-routes/company-info/company-info.module#CompanyInfoModule"
    }
    // {
    //     path: AppRoutes.appRoutePaths.takeaways,
    //     loadChildren: "./slideout-routes/takeaways/takeaways.module#TakeawaysModule"
    // }

    //////////////////////////////////////////////////
    // Redirects
    //////////////////////////////////////////////////
    // {
    //     path: "**",
    //     pathMatch: "full",
    //     redirectTo: AppRoutes.appRoutePaths.login
    // }
];

@NgModule({
    imports: [
        /**
         * Configure the router for the application.
         *
         * NOTE: Use `enableTracing: true` to see Angular built-in router logging.
         */
        RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
    ],
    exports: [RouterModule],
    providers: PROVIDERS
})
export class AppRoutingModule {}
