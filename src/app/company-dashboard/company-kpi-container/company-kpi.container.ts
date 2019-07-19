import "zone.js";
import { Component, OnInit, ElementRef, TemplateRef, ViewContainerRef, ViewChild, HostListener, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { PopupService, PopupRef, Align } from "@progress/kendo-angular-popup";
import { ebitda, revenue } from "../financials-data";
import { Logger } from "@util/logger";
import { TimelineDataPointFin, TimelineDataPoint } from "@shared/chart-components/interfaces/types";
import { CompanyKpiDetailComponent } from "./../company-kpi-detail/company-kpi-detail.component";


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
        this.timelineData = [];
        this.timelineData2 = [];
        this.timelineData3 = [];
    }
    private static logger: Logger = Logger.getLogger("CompanyKpiContainer");

    timelineData: TimelineDataPointFin[];
    timelineData2: TimelineDataPointFin[];
    timelineData3: TimelineDataPointFin[];
    chartData: Array<any>;

    /**
     * Internal logger.
     */

    public toggleText = "Show";
    public show = false;
    private popupRef: PopupRef;

    @ViewChild("anchor") public anchor: ElementRef;
    @ViewChild("popup", { read: ElementRef }) public popup: ElementRef;
    @ViewChild("popUpContainer", { read: ViewContainerRef }) public popUpContainer: ViewContainerRef;

    public onToggle(): void {
        this.show = !this.show;
        this.toggleText = this.show ? "Show" : "Hide";
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

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiContainer.logger.debug(`ngOnInit()`);
        this.timelineData = revenue;
        this.timelineData2 = ebitda;
        this.timelineData3 = ebitda;
        setTimeout(() => {
            this.generateData();

            // change the data periodically
            setInterval(() => this.generateData(), 3000);
        }, 1000);
    }

    generateData() {
        this.chartData = [];
        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            this.chartData.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
        }
    }

    openDetail($event, anchor: ElementRef) {
        console.log("kpi container", $event);
        console.log("kpi container", anchor);
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        } else {
            this.popupRef = this.popupService.open({
                anchor: this.anchor,
                content: CompanyKpiDetailComponent
            });
        }
    }

    public toggle(show?: boolean): void {
        this.show = show !== undefined ? show : !this.show;
        this.toggleText = this.show ? "Hide" : "Show";
    }

    private contains(target: any): boolean {
        return this.anchor.nativeElement.contains(target) || (this.popup ? this.popup.nativeElement.contains(target) : false);
    }
}
