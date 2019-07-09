import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { TeamActions, TeamActionTypes } from "./team.actions";
import { TeamMember, TeamMemberGroup } from "../../domain/company.model";
import * as _ from "lodash";

export interface State extends EntityState<TeamMemberGroup> {
    selectedTeamMemberGroup: TeamMemberGroup | null;
}

export const adapter: EntityAdapter<TeamMemberGroup> = createEntityAdapter<TeamMemberGroup>({
    selectId: (group: TeamMemberGroup) => group.id
});

export const initialState: State = adapter.getInitialState({
    selectedTeamMemberGroup: null
});

/**
 * At present, only a "name" property returns from the API. This method parses the first and last name and initials for use in the UI
 * @param teams
 */
function prepareNames(teams: TeamMemberGroup[]): TeamMemberGroup[] {
    const updated = _.each(_.flatMapDeep(teams, "members"), (member: TeamMember) => {
        const nameSplit = member.name.split(" ");
        const fName = _.head(nameSplit);
        const lname = _.join(_.tail(nameSplit), "");
        return _.extend(member, { firstName: fName, lastName: lname, initials: fName[0] + lname[0] });
    });

    return teams;
}

export function reducer(state = initialState, action: TeamActions): State {
    switch (action.type) {
        case TeamActionTypes.GetAllSuccess:
            return action.payload.length > 0 ? adapter.addMany(prepareNames(action.payload), state) : state;

        case TeamActionTypes.SetSelectedTeamMemberGroup:
            return { ...state, selectedTeamMemberGroup: action.payload };

        default: {
            return state;
        }
    }
}

export const getSelectedTeamMemberGroup = (state: State) => state.selectedTeamMemberGroup;
