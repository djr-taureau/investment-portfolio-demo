import { Observable } from "rxjs";

export interface IAuthService {
    readonly isAuthenticated: boolean;
    login(): Observable<boolean>;
    logout(): Observable<boolean>;
    checkAuth(): void;
}
