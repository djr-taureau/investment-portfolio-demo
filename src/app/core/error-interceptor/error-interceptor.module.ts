import { ErrorHandler, NgModule } from "@angular/core";
import { ErrorInterceptor } from "./error.interceptor";

const PROVIDERS = [
    {
        provide: ErrorHandler,
        useClass: ErrorInterceptor
    }
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: PROVIDERS
})
export class ErrorInterceptorModule {}
