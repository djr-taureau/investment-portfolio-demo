import "zone.js";
import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";

@Component({
    selector: "sbp-company-dashboard",
    templateUrl: "./company-dashboard.component.html",
    styleUrls: ["./company-dashboard.component.scss"],
    animations: [expandOutFromTop]
})
export class CompanyDashboardComponent implements OnInit {
    private _showRevenueDetail = false;

    @Input()
    public set showRevenueDetail(value: boolean) {
        if (!value) {
            this._showRevenueDetail = value;
        } else if (this._showRevenueDetail !== value) {
            setTimeout(() => {
                this._showRevenueDetail = value;
            }, 300);
        }
    }

    public get showRevenueDetail(): boolean {
        return this._showRevenueDetail;
    }

    @Input()
    public showCashDetail = false;

    @Input()
    public showEBITDADetail = false;

    constructor(private store$: Store<any>) {}
    ngOnInit() {}
}
