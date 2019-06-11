import { Injectable } from "@angular/core";
import { Logger } from "../../util/logger";
import { adal } from "adal-angular";
import { AdalAuthConfig } from "./adal-auth.config";

// NOTE: Required in order for the TS compiler to not complain about the unknown ADAL lib.
// NOTE NOTE: MS dropped the ball and hasn't created a legit library that plays nice in the
// JS module world...there are numerous tickets open on their GitHub site noting that it's
// been 2 years without a fix.
declare var AuthenticationContext: adal.AuthenticationContextStatic;
const createAuthContextFn: adal.AuthenticationContextStatic = AuthenticationContext;

@Injectable({
    providedIn: "root"
})
export class AdalAuthContextService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AdalAuthContextService");

    /**
     * Creates a new instance of the ADAL AuthenticationContext.
     * @param config
     */
    public build(config: AdalAuthConfig) {
        return new createAuthContextFn(config);
    }

    /**
     * Constructor.
     */
    constructor() {
        AdalAuthContextService.logger.debug(`constructor()`);
    }
}
