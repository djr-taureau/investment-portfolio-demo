import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { TeamMember } from "../../domain/company.model";
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

export function reducer(state = initialState, action: TeamMemberActions): State {
    switch (action.type) {
        case TeamMemberActionTypes.GetTeamMemberSuccess:
            state.selectedTeamMember = action.payload;
            return adapter.addOne(action.payload, state);

        case TeamMemberActionTypes.SetSelectedTeamMember:
            return { ...state, selectedTeamMember: action.payload };

        default: {
            return state;
        }
    }
}

export const getSelectedTeamMember = (state: State) => state.selectedTeamMember;
