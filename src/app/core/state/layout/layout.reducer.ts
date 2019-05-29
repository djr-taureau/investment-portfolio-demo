import { LayoutActions, LayoutActionTypes } from "./layout.actions";

export interface LayoutState {
    showSlideout: boolean;
}

export const initialState: LayoutState = {
    showSlideout: false
};

function toggleSlideout(show: boolean, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        showSlideout: show
    };
}

export function layoutReducer(state: LayoutState = initialState, action: LayoutActions): LayoutState {
    switch (action.type) {
        case LayoutActionTypes.ToggleSlideout:
            return toggleSlideout(action.payload, state);
        default:
            return state;
    }
}

export const getShowSlideout = (state: LayoutState) => state.showSlideout;
