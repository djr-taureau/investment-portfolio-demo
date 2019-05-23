import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Logger } from "../../util/logger";
import { ApiResponse } from "../domain/api.model";
import { Auth, AuthResponse, ChangePasswordCredentials, LoginCredentials, RegisterCredentials } from "../domain/auth.model";
import { ApiEndpointService } from "./api-endpoint.service";
import * as StringUtil from "../../util/string.util";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("AuthService");

    /**
     * Constructor.
     */
    constructor(private http: HttpClient) {}

    /**
     * Attempt authentication.
     */
    public login(creds: LoginCredentials): Observable<Auth> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.LOGIN);
        const request = {
            username: creds.username,
            password: creds.password
        };
        AuthService.logger.info(`login( ${creds.username} )`);

        return this.http.post(url, request).pipe(
            map(
                (response: ApiResponse): Auth => {
                    const data: AuthResponse = response.data as AuthResponse;
                    if (data.newPasswordRequired) {
                        AuthService.logger.info(`loginSuccess( New password required...usually after temp password from new registration. )`);
                        return {
                            ...creds,
                            accessToken: null,
                            idToken: null,
                            newPasswordRequired: true
                        };
                    } else if (data.idToken) {
                        AuthService.logger.info(`loginSuccess( Received access token: ${StringUtil.truncate(data.idToken, 10)} )`);
                        return {
                            ...creds,
                            accessToken: data.accessToken,
                            idToken: data.idToken,
                            newPasswordRequired: false
                        };
                    } else {
                        const error = {
                            error: {
                                message: "No token in the response."
                            }
                        };
                        throw new HttpErrorResponse(error);
                    }
                }
            ),
            catchError((fault: HttpErrorResponse) => {
                AuthService.logger.warn(`loginFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Attempt new user registration.
     */
    public register(creds: RegisterCredentials): Observable<RegisterCredentials> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.REGISTER);
        const request = {
            username: creds.username
        };
        AuthService.logger.info(`register( ${request.username} )`);

        return this.http.post(url, request).pipe(
            map(
                (response: ApiResponse): RegisterCredentials => {
                    AuthService.logger.info(`registerSuccess()`);
                    return {
                        ...creds
                    };
                }
            ),
            catchError((fault: HttpErrorResponse) => {
                AuthService.logger.warn(`registerFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Attempt change password.
     */
    public changePassword(creds: ChangePasswordCredentials): Observable<Auth> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.LOGIN);
        const request = {
            username: creds.username,
            password: creds.oldPassword,
            newPassword: creds.newPassword
        };
        AuthService.logger.info(`changePassword( ${creds.username} )`);

        return this.http.post(url, request).pipe(
            map(
                (response: ApiResponse): Auth => {
                    const data: AuthResponse = response.data as AuthResponse;
                    AuthService.logger.info(`changePasswordSuccess( Received access token: ${StringUtil.truncate(data.idToken, 10)} )`);
                    return {
                        username: creds.username,
                        password: creds.newPassword,
                        accessToken: data.accessToken,
                        idToken: data.idToken,
                        newPasswordRequired: false
                    };
                }
            ),
            catchError((fault: HttpErrorResponse) => {
                AuthService.logger.warn(`changePasswordFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }
}
