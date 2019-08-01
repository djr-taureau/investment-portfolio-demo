import { HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { FooterModule } from "@core/footer/footer.module";
import { HeaderModule } from "@core/header/header.module";
import { AppInitializerModule } from "@core/init/app-initializer.module";
import { SlideoutModule } from "@core/slideout/slideout.module";
import { AuthServiceModule } from "@core/auth/auth-service.module";
import { ErrorInterceptorModule } from "@core/error-interceptor/error-interceptor.module";
import { HttpInterceptorModule } from "@core/http-interceptor/http-interceptor.module";
import { RouteGuardModule } from "@core/route-guard/route-guard.module";
import { ServiceModule } from "@core/service/service.module";
import { StateModule } from "@core/state/state.module";

const MODULES = [
    AppInitializerModule,
    AuthServiceModule,
    HttpClientModule,
    ErrorInterceptorModule,
    FooterModule,
    HeaderModule,
    HttpInterceptorModule,
    RouteGuardModule,
    ServiceModule,
    SlideoutModule,
    StateModule
];
const PROVIDERS = [];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    providers: PROVIDERS
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import only once in main AppModule.");
        }
    }
}
