import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { TeamMemberGroup } from "../../domain/company.model";
import { TeamActions, TeamActionTypes } from "./team.actions";

export interface State extends EntityState<TeamMemberGroup> {}

export const adapter: EntityAdapter<TeamMemberGroup> = createEntityAdapter<TeamMemberGroup>({});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: TeamActions): State {
    switch (action.type) {
        case TeamActionTypes.GetAllSuccess:
            return action.payload.length > 0 ? adapter.addAll(action.payload, state) : state;

        default: {
            return state;
        }
    }
}
