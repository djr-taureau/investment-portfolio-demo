import { Injectable } from "@angular/core";
import { Company } from "./../domain/company.model";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Logger } from "../../util/logger";
// const apiRoot = environment.apiUrlBase;
const HEADER = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
@Injectable()
export class CompanyService {
    private static logger: Logger = Logger.getLogger("CompanyService");
    constructor(private http: HttpClient) {}
    /**
     * Retrieves all the companies
     */
    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(environment.api).pipe(
            catchError((fault: HttpErrorResponse) => {
                CompanyService.logger.warn(`companiesFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    searchCompanies(queryTitle: string): Observable<Company[]> {
        return this.http.get<{ items: Company[] }>(`${environment.api}?q=${queryTitle}`).pipe(map((companies) => companies.items || []));
    }
}
