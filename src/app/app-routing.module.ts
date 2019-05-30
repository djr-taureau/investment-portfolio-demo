import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthRouteGuard } from "./core/route-guard/auth.route-guard";
import * as AppRoutes from "./app.routes";

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
        RouterModule.forRoot(routes, { useHash: false, enableTracing: false })
    ],
    exports: [RouterModule],
    providers: PROVIDERS
})
export class AppRoutingModule {}
