import "zone.js";
import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ToggleCashBurnDetail, ToggleEBITDADetail, ToggleRevenueDetail } from "@core/state/flow/company-flow.actions";
import { CompanyKpiDetailComponent } from "./../company-kpi-detail/company-kpi-detail.component";
import { ebitda, revenue, cashburn } from "../financials-data";
import { Logger } from "@util/logger";
import { PopupService, PopupRef, Align } from "@progress/kendo-angular-popup";
import { Store } from "@ngrx/store";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";

@Component({
    selector: "sbp-company-kpi-container",
    styleUrls: ["./company-kpi.container.scss"],
    templateUrl: "./company-kpi.container.html"
})
export class CompanyKpiContainer implements OnInit {
    /**
     * Constructor.
     */
    constructor(private store$: Store<any>, private popupService: PopupService) {
        CompanyKpiContainer.logger.debug(`constructor()`);
    }
    private static logger: Logger = Logger.getLogger("CompanyKpiContainer");
    private popupRef: PopupRef;
    public show = false;
    public enabled = true;
    public duration = 200;
    public type = "slide";
    public direction = "down";

    timelineData: TimelineDataPointFin[];
    timelineData2: TimelineDataPointFin[];
    timelineData3: TimelineDataPointFin[];
    chartData: Array<any>;
    /**
     * Internal logger.
     */

    @ViewChild("anchor") public anchor: ElementRef;
    @ViewChild("popup", { read: ElementRef }) public popup: ElementRef;
    @ViewChild("container", { read: ViewContainerRef }) public container: ViewContainerRef;

    public onRevenueClick() {
        this.store$.dispatch(new ToggleRevenueDetail());
    }

    public onEBITDAClick() {
        this.store$.dispatch(new ToggleEBITDADetail());
    }
    public onCashburnClick() {
        this.store$.dispatch(new ToggleCashBurnDetail());
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiContainer.logger.debug(`ngOnInit()`);
        this.timelineData = revenue;
        this.timelineData2 = ebitda;
        this.timelineData3 = ebitda;
    }

    openDetail($event, anchor: ElementRef) {
        if (this.popupRef) {
            this.popupRef.close();
            this.toggle(false);
            this.popupRef = null;
        } else {
            this.popupRef = this.popupService.open({
                anchor: this.anchor,
                appendTo: this.container
            });
            this.toggle(true);
        }
    }

    public get animate(): any {
        if (this.enabled) {
            return {
                type: this.type,
                direction: this.direction,
                duration: this.duration
            };
        }

        return false;
    }

    public close(): void {
        this.show = false;
    }

    public toggle(show?: boolean): void {
        this.show = show !== undefined ? show : !this.show;
    }

    private contains(target: any): boolean {
        return this.anchor.nativeElement.contains(target) || (this.popup ? this.popup.nativeElement.contains(target) : false);
    }

    @HostListener("keydown", ["$event"])
    public keydown(event: any): void {
        if (event.keyCode === 27) {
            this.toggle(false);
        }
    }

    @HostListener("document:click", ["$event"])
    public documentClick(event: any): void {
        if (!this.contains(event.target)) {
            this.toggle(false);
        }
    }
}
