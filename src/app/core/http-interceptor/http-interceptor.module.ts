import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AddTokenHeaderHttpRequestInterceptor } from "./add-token-header.http-request-interceptor";
import { ServerErrorHttpResponseInterceptor } from "./server-error.http-response-interceptor";

const PROVIDERS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AddTokenHeaderHttpRequestInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ServerErrorHttpResponseInterceptor,
        multi: true
    }
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: PROVIDERS
})
export class HttpInterceptorModule {}
