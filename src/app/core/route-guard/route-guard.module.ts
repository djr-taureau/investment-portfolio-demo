import { NgModule } from "@angular/core";
import { AuthRouteGuard } from "@core/route-guard/auth.route-guard";

const PROVIDERS = [AuthRouteGuard];

@NgModule({
    providers: PROVIDERS
})
export class RouteGuardModule {}
