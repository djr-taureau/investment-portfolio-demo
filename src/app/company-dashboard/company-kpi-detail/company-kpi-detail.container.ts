import { Component, ElementRef, ViewContainerRef, ViewChild } from "@angular/core";
import { PopupService, PopupRef } from "@progress/kendo-angular-popup";
import { CompanyKpiDetailComponent } from "./company-kpi-detail.component";

@Component({
    selector: "sbp-company-kpi-detail",
    template: `
        <span></span>
    `
})
export class CompanyKpiDetailContainer {
    @ViewChild("container", { read: ViewContainerRef }) public container: ViewContainerRef;
    private popupRef: PopupRef;

    constructor(private popupService: PopupService) {}

    public togglePopup(anchor: ElementRef) {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        } else {
            this.popupRef = this.popupService.open({
                anchor,
                appendTo: this.container,
                content: CompanyKpiDetailComponent
            });
        }
    }
}
