import { ApiEndpointService } from "./api-endpoint.service";
import { ApiService } from "./api.service";
import { GetAllTeamsResponse } from "../domain/company.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "@util/logger";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";

@Injectable()
export class TeamService {
    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("TeamService");

    /**
     * Constructor.
     * @param http
     */
    constructor(private store$: Store<any>, private apiService: ApiService) {
        TeamService.logger.debug(`constructor()`);
    }

    /**
     * Retrieves all the teams
     */
    public getTeams(id: string): Observable<GetAllTeamsResponse> {
        TeamService.logger.debug(`getTeams(${id})`);

        const params = {
            id
        };
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.TEAMS, params);

        return this.apiService.get(url).pipe(
            catchError((fault: HttpErrorResponse) => {
                TeamService.logger.warn(`teamsFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }
}
