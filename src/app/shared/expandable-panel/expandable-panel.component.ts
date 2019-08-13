import { Component, EventEmitter, Input, Output } from "@angular/core";
import { simpleFade } from "@shared/animations/fade.animations";

@Component({
    selector: "sbp-expandable-panel",
    templateUrl: "./expandable-panel.component.html",
    styleUrls: ["./expandable-panel.component.scss"],
    animations: [simpleFade]
})
export class ExpandablePanelComponent {
    constructor() {}
    private _visible = false;

    @Input()
    public set visible(value: boolean) {
        if (!value) {
            this._visible = value;
        } else if (this._visible !== value) {
            this._visible = value;
        }
    }
    public get visible() {
        return this._visible;
    }

    @Output()
    public close: EventEmitter<any> = new EventEmitter();

    public onClose() {
        this.close.emit();
    }
}
