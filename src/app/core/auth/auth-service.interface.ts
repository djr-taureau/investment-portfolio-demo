import { Observable } from "rxjs";

export interface IAuthService {
    login(): Observable<boolean>;
    logout(): Observable<boolean>;
    checkAuth(): void;
}
