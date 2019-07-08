import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { TeamMemberGroup } from "../../domain/company.model";
import { TeamActions, TeamActionTypes } from "./team.actions";

export interface State extends EntityState<TeamMemberGroup> {
    selectedTeamMemberGroup: TeamMemberGroup | null;
}

export const adapter: EntityAdapter<TeamMemberGroup> = createEntityAdapter<TeamMemberGroup>({
    selectId: (group: TeamMemberGroup) => group.id
});

export const initialState: State = adapter.getInitialState({
    selectedTeamMemberGroup: null
});

export function reducer(state = initialState, action: TeamActions): State {
    switch (action.type) {
        case TeamActionTypes.GetAllSuccess:
            return action.payload.length > 0 ? adapter.addMany(action.payload, state) : state;

        case TeamActionTypes.SetSelectedTeamMemberGroup:
            return { ...state, selectedTeamMemberGroup: action.payload };

        default: {
            return state;
        }
    }
}

export const getSelectedTeamMemberGroup = (state: State) => state.selectedTeamMemberGroup;
