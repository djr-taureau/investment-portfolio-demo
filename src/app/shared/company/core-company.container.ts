import * as _ from "lodash";
import { ActivatedRoute } from "@angular/router";
import { Company } from "../../core/domain/company.model";
import { Observable } from "rxjs";
import { OnInit } from "@angular/core";
import { setSelectedCompany } from "../../core/state/company/company.actions";
import { Store } from "@ngrx/store";

export class CoreCompanyContainer implements OnInit {
    protected selectedCompany$: Observable<Company>;

    ngOnInit() {
        // Ensure that the url is evaluated for company id and updates the selected company if it exists
        this.route$.params.subscribe((params) => {
            if (_.get(params, "id", null)) {
                this.store$.dispatch(setSelectedCompany({ id: Number(params.id) }));
            }
        });

        // TODO: GMAN - For later
        // this.route$.queryParams.subscribe((qParams) => {
        //
        // });
    }
    constructor(protected store$: Store<any>, protected route$: ActivatedRoute) {}
}
