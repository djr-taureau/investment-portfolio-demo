import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule, RouterStateSerializer, routerReducer } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../../environments/environment";
import { AuthEffect } from "./auth/auth.effect";
import { FlowEffect } from "./flow/flow.effect";
import { CustomRouterStateSerializer } from "./router/custom-router-state.serializer";
import { reducers } from "./index";
import { reducers as portfolioReducers } from "./portfolio/index";
import { RouterEffect } from "./router/router.effect";
import { PortfolioEffects } from "./portfolio/portfolio.effects";
import { CompanyEffects } from "./company/company.effects";
import * as CompanyDashboard from "./company/dashboard";

const EFFECTS = [RouterEffect, AuthEffect, FlowEffect, PortfolioEffects, CompanyEffects];

const MODULES = [
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers),
    StoreModule.forFeature("portfolio", portfolioReducers),
    StoreModule.forFeature("companyDashboard", CompanyDashboard.reducers),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot(EFFECTS),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
        // They stateKey defines the name of the state used by the router-store reducer.
        // This matches the key defined in the map of reducers
        stateKey: "router"
    }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
        name: "Soft Bank Store DevTools",
        logOnly: environment.production
    })
];

@NgModule({
    imports: MODULES,
    declarations: [],
    providers: [
        /**
         * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
         * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
         * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
         */
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
    ]
})
export class StateModule {}
