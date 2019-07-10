import "rxjs/operators/first";
import { LoadPortfolio } from "@core/state/flow/portfolio-flow.actions";
import * as _ from "lodash";
import { ActivatedRoute } from "@angular/router";
import { Company } from "@core/domain/company.model";
import { getCompanyNavLinks } from "@core/state";
import { NavigationBarLink } from "../navigation-bar/navigation-bar-link";
import { Observable } from "rxjs";
import { OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SetSelectedCompany } from "@core/state/company/company.actions";
import { SetSelectedCompanyLink } from "@core/state/layout/layout.actions";

export class CoreCompanyContainer implements OnInit {
    protected selectedCompany$: Observable<Company>;
    private componentUrl: string;

    ngOnInit() {
        // Load the portfolio
        this.store$.dispatch(new LoadPortfolio());

        // Ensure that the url is evaluated for company id and updates the selected company if it exists
        this.route$.params.subscribe((params) => {
            if (_.get(params, "id", null)) {
                this.store$.dispatch(new SetSelectedCompany(params.id));
            }
        });

        // Ensure that the selected link is always set in the layout when the container is init
        const links$ = this.store$.pipe(select(getCompanyNavLinks));
        links$.subscribe((links) => {
            const matchingLink = _.find(links, (link: NavigationBarLink) => link.route === this.componentUrl);
            if (matchingLink) {
                this.store$.dispatch(new SetSelectedCompanyLink(matchingLink.route));
            }
        });
    }
    constructor(protected store$: Store<any>, protected route$: ActivatedRoute, featureUrl: string) {
        this.componentUrl = featureUrl;
    }
}
