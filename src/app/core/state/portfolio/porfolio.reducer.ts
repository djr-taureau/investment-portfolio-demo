import { appRoutePaths } from "@app/app.routes";
import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { Portfolio, PortfolioExposure, PortfolioInvestmentSummary } from "@core/domain/portfolio.model";
import { PortfolioActions, PortfolioActionTypes } from "@core/state/portfolio/portfolio.actions";

export interface State {
    portfolio: Portfolio;
    investmentSummary: PortfolioInvestmentSummary;
}

const initialState: State = {
    portfolio: null,
    investmentSummary: null
};

const displayFinancialControls = (link: PortfolioDashboardNavBarLink) => link.route === appRoutePaths.portfolioDashboardFinancials;

function updatePortfolio(port: Portfolio, state: State = initialState): State {
    return {
        ...state,
        portfolio: port
    };
}

function updateInvestmentSummaryInfo(summary: PortfolioInvestmentSummary, state: State = initialState): State {
    return {
        ...state,
        investmentSummary: summary
    };
}

export function reducer(state = initialState, action: PortfolioActions): State {
    switch (action.type) {
        case PortfolioActionTypes.LoadPortfolioSuccess:
            return updatePortfolio(action.payload, state);
        case PortfolioActionTypes.LoadPortfolioInvestmentSummarySuccess:
            return updateInvestmentSummaryInfo(action.payload, state);
        default: {
            return state;
        }
    }
}

export const getInvestmentSummary = (state: State) => state.investmentSummary;
export const getPortfolio = (state: State) => state.portfolio;
