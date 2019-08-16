import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AdalAuthConfig } from "@core/auth/adal-auth.config";
import { AdalAuthConfigService } from "@core/auth/auth-config.service";
import { Config, defaultConfig } from "@core/domain/config.model";
import { catchError, map } from "rxjs/operators";
import { ApiEndpointService } from "./api-endpoint.service";
import { Logger } from "@util/logger";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ConfigService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ConfigService");

    /**
     * Reference to the application's local JSON config data. Saved for later
     * as the data is loaded before app init and therefore not ready to save
     * to a Redux store.
     */
    private config$: BehaviorSubject<Config> = new BehaviorSubject(defaultConfig);

    /**
     * Constructor.
     */
    constructor(
        protected http: HttpClient,
        private apiEndpointService: ApiEndpointService,
        @Inject(AdalAuthConfigService) private adalAuthConfig: AdalAuthConfig
    ) {
        ConfigService.logger.debug(`constructor()`);
    }

    /**
     * Requests the application's config data.
     */
    public load(): Promise<Config> {
        const url = this.apiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.CONFIG, null, null, true);
        ConfigService.logger.debug(`load()`);
        return (
            this.http
                .get(url)
                .pipe(
                    map((response: Config) => {
                        ConfigService.logger.debug(`loadSuccess()`);
                        const config: Config = {
                            ...(response as Config),
                            initialized: true
                        };

                        // Order matters here...
                        // 1) Update the ADAL auth config with data from loaded config.
                        // 2) Set a flag that ADAL auth is good to go.
                        // 3) Update the API Endpoint service with the value from config.
                        // 4) Set the latest config on the service's observable config.
                        this.updateAdalAuthConfig(config);
                        this.updateApiEndpoint(config);
                        this.config$.next(config);
                        return config;
                    }),

                    // It's possible that the HTTP request fails or our above mapping fails...
                    // If the HTTP request fails we need to create a generic Error using the message.
                    // If it's already an Error we simply rethrow it.
                    //
                    // This is so we can catch the error below once we convert the observable stream
                    // to a promise.
                    catchError((fault: Error | HttpErrorResponse) => {
                        ConfigService.logger.warn(`loadFault( ${fault.message} )`);
                        throw fault;
                    })
                )
                // Handle any errors here and make sure we swallow the error so the app
                // still loads -- if we continue the error propagation we'll stop the
                // app loading and the user will be stuck on the loading spinner...now
                // we can specifically set the `initialized` flag in the config object to
                // false and show an error message in the app.
                .toPromise()
                .catch((error: Error) => {
                    throw new Error(`Could not load initial, required config data!!!`);
                })
        );
    }

    /**
     * Accessor for the private member config as an observable stream.
     */
    public getConfig(): BehaviorSubject<Config> {
        return this.config$;
    }

    /**
     * Accessor for the private member config value.
     */
    public getConfigValue(): Config {
        return this.getConfig().value;
    }

    /**
     * Accessor for the config's API endpoint.
     */
    public getConfigApiEndpoint(): string {
        return this.getConfigValue().apiEndpoint;
    }

    /**
     * Update the API endpoint with data from the loaded config.
     * @param config
     */
    private updateApiEndpoint(config: Config): void {
        ApiEndpointService.BASE_URL.FROM_CONFIG = config.apiEndpoint;
    }

    /**
     * Update the ADAL auth config with data from the loaded config.
     * @param config
     */
    private updateAdalAuthConfig(config: Config): void {
        this.adalAuthConfig.clientId = config.adClientId;
        this.adalAuthConfig.instance = config.adInstance;
        this.adalAuthConfig.tenant = config.adTenant;
    }
}
