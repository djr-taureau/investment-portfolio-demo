import { FindCompanyActions } from "../search";
import { CompanyApiActions } from "../../company";

export interface State {
    ids: number[];
    loading: boolean;
    error: string;
    query: string;
}

const initialState: State = {
    ids: [],
    loading: false,
    error: "",
    query: ""
};

export function reducer(
    state = initialState,
    action: CompanyApiActions.CompaniesApiActionsUnion | FindCompanyActions.FindCompanyPageActionsUnion
): State {
    switch (action.type) {
        case FindCompanyActions.searchCompanies.type: {
            const query = action.query;

            if (query === "") {
                return {
                    ids: [],
                    loading: false,
                    error: "",
                    query
                };
            }

            return {
                ...state,
                loading: true,
                error: "",
                query
            };
        }

        case CompanyApiActions.searchSuccess.type: {
            return {
                ids: action.companies.map((company) => company.id),
                loading: false,
                error: "",
                query: state.query
            };
        }

        case CompanyApiActions.searchFailure.type: {
            return {
                ...state,
                loading: false,
                error: action.errorMsg
            };
        }

        default: {
            return state;
        }
    }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
