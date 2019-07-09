import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import * as _ from "lodash";
import { TeamMember } from "@core/domain/company.model";
import { TeamMemberActionTypes, TeamMemberActions } from "./team-member.actions";

export interface State extends EntityState<TeamMember> {
    selectedTeamMember: TeamMember | null;
}

export const adapter: EntityAdapter<TeamMember> = createEntityAdapter<TeamMember>({
    selectId: (member: TeamMember) => member.id
});

export const initialState: State = adapter.getInitialState({
    selectedTeamMember: null
});

function prepareName(member: TeamMember): TeamMember {
    const nameSplit = member.name.split(" ");
    const fName = _.head(nameSplit);
    const lname = _.join(_.tail(nameSplit), "");
    return _.extend(member, { firstName: fName, lastName: lname, initials: fName[0] + lname[0] });
}
export function reducer(state = initialState, action: TeamMemberActions): State {
    switch (action.type) {
        case TeamMemberActionTypes.GetTeamMemberSuccess:
            state.selectedTeamMember = action.payload;
            return adapter.addOne(prepareName(action.payload), state);

        case TeamMemberActionTypes.SetSelectedTeamMember:
            return { ...state, selectedTeamMember: action.payload };

        default: {
            return state;
        }
    }
}

export const getSelectedTeamMember = (state: State) => state.selectedTeamMember;
