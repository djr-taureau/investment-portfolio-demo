import { TeamMemberGroup } from "@core/domain/company.model";
import { PortfolioExposure } from "@core/domain/portfolio.model";
import * as fromCompany from "@core/state/company/company.reducer";
import { PortfolioExposureActions, PortfolioExposureActionTypes } from "@core/state/portfolio-dashboard/exposures/portfolio-exposure.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import * as _ from "lodash";

export interface State extends EntityState<PortfolioExposure> {}
export const adapter: EntityAdapter<PortfolioExposure> = createEntityAdapter<PortfolioExposure>({
    selectId: (exposure: PortfolioExposure) => exposure.id
});
const initialState: State = adapter.getInitialState({
    // exposures: null
});

export function reducer(state = initialState, action: PortfolioExposureActions): State {
    switch (action.type) {
        case PortfolioExposureActionTypes.LoadPortfolioRevenueFxExposuresSuccess:
        case PortfolioExposureActionTypes.LoadPortfolioRevenueSectorExposuresSuccess:
            // return {
            //     ...state,
            //     exposures: _.uniq((state.exposures || []).concat(action.payload))
            // };
            return adapter.addMany(action.payload, state);
        default: {
            return state;
        }
    }
}
