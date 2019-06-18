import "rxjs/operators/first";
import * as _ from "lodash";
import { getPortfolioNavLinks } from "../../core/state";
import { LoadPortfolio } from "../../core/state/flow/flow.actions";
import { NavigationBarLink } from "../navigation-bar/navigation-bar-link";
import { OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SetSelectedPortfolioLink } from "@core/state/layout/layout.actions";

export class CorePortfolioContainer implements OnInit {
    private componentUrl: string;

    ngOnInit() {
        const links$ = this.store$.pipe(select(getPortfolioNavLinks));
        links$.subscribe((links) => {
            const matchingLink = _.find(links, (link: NavigationBarLink) => link.route === this.componentUrl);
            if (matchingLink) {
                this.store$.dispatch(new SetSelectedPortfolioLink(matchingLink.route));
            }
        });

        // Load the portfolio
        this.store$.dispatch(new LoadPortfolio());
    }
    constructor(protected store$: Store<any>, featureUrl: string) {
        this.componentUrl = featureUrl;
    }
}
