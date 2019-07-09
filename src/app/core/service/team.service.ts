import { GetTeamMemberResponse } from "./../domain/company.model";
import { ApiEndpointService } from "./api-endpoint.service";
import { ApiService } from "./api.service";
import { GetAllTeamsResponse, TeamMember } from "@core/domain/company.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "@util/logger";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import * as uuid from "uuid";

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
            map((result) => {
                result.data.teams.forEach((element) => {
                    element.id = uuid.v4();
                    element.companyId = id;
                });
                return result;
            }),
            catchError((fault: HttpErrorResponse) => {
                TeamService.logger.warn(`teamsFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Retrieves team member
     */
    public getTeamMember(memberId: string, companyId: string): Observable<GetTeamMemberResponse> {
        TeamService.logger.debug(`getTeamMember()`);

        const params = {
            member_id: memberId,
            id: companyId
        };
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.TEAM_MEMBER, params);

        return this.apiService.get(url).pipe(
            catchError((fault: HttpErrorResponse) => {
                TeamService.logger.warn(`teamsFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }
}
