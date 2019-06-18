import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Logger } from "@util/logger";
import { AdalAuthService } from "./adal-auth.service";
import { IAuthService } from "./auth-service.interface";

@Injectable({
    providedIn: "root"
})
export class AuthService implements IAuthService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AuthService");

    /**
     * Constructor.
     */
    constructor(private adalAuthService: AdalAuthService) {}

    /**
     * Attempt authentication.
     */
    public login(): Observable<boolean> {
        AuthService.logger.info(`login()`);
        return this.adalAuthService.login();
    }

    /**
     * Attempt logout.
     */
    public logout(): Observable<boolean> {
        AuthService.logger.info(`logout()`);
        return this.adalAuthService.logout();
    }

    /**
     * Check if the user is authenticated in the same session.
     */
    public checkAuth(): void {
        AuthService.logger.info(`checkAuth()`);
        this.adalAuthService.checkAuth();
    }

    /**
     * Determines if the user is authenticated.
     */
    public get isAuthenticated(): boolean {
        const result: boolean = this.adalAuthService.isAuthenticated;
        AuthService.logger.info(`isAuthenticated( ${result} )`);
        return result;
    }
}
