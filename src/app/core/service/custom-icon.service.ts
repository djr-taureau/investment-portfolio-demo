import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomIconService {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}
    init() {
        this.matIconRegistry.addSvgIcon("arrow_down", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/image/arrow-down.svg"));
        this.matIconRegistry.addSvgIcon("sort", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/image/sort.svg"));
        this.matIconRegistry.addSvgIcon("card", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/image/card.svg"));
        this.matIconRegistry.addSvgIcon("list", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/image/list.svg"));
        this.matIconRegistry.addSvgIcon("grouping", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/image/grouping.svg"));
    }
}
