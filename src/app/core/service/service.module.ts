import { NgModule } from "@angular/core";
import { ApiEndpointService } from "./api-endpoint.service";
import { AuthService } from "./auth.service";

const PROVIDERS = [ApiEndpointService, AuthService];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
