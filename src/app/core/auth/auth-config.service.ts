import { InjectionToken } from "@angular/core";
import { AdalAuthConfig } from "./adal-auth.config";

/**
 * This is not a real service, but it looks like it from the outside.
 * It"s just an InjectionTToken used to import the config object, provided from the outside.\
 *
 * NOTE: Don't lint the next line as we want this to look and feel like a service with SnakeCase
 * as opposed to normal variable camelCase.
 */
// tslint:disable-next-line
export const AdalAuthConfigService = new InjectionToken<AdalAuthConfig>("AdalAuthConfig");
