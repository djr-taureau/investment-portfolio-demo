import { NgModule } from "@angular/core";
import { ApiEndpointService } from "./api-endpoint.service";
import { AuthService } from "../auth/auth.service";
import { CompanyService } from "./company.service";

const PROVIDERS = [ApiEndpointService, AuthService, CompanyService];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
