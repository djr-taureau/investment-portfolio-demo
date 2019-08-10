import { ComponentRef, Directive, ElementRef, HostListener, HostBinding, Input, OnInit } from "@angular/core";
import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

import { TooltipComponent } from "./tooltip.component";

@Directive({ selector: "[sbpTooltip]" })
export class TooltipDirective implements OnInit {
    private overlayRef: OverlayRef;

    @Input("sbpTooltip") text = "";
    @HostBinding("class")
    elementClass = "disabled-preview";

    constructor(private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder, private elementRef: ElementRef) {}

    ngOnInit(): void {
        const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
            {
                originX: "center",
                originY: "top",
                overlayX: "center",
                overlayY: "bottom",
                offsetY: -8
            }
        ]);

        this.overlayRef = this.overlay.create({ positionStrategy });
    }

    @HostListener("mouseenter")
    show() {
        const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
        tooltipRef.instance.text = this.text;
    }

    @HostListener("mouseout")
    hide() {
        this.overlayRef.detach();
    }
}
