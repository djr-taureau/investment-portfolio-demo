import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "sbp-tooltip",
    styleUrls: ["./tooltip.component.scss"],
    templateUrl: "./tooltip.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("tooltip", [
            transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
            transition(":leave", [animate(300, style({ opacity: 0 }))])
        ])
    ]
})
export class TooltipComponent {
    @Input() text = "";
}
