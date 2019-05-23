import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { HeaderComponent } from "./header.component";
import { HeaderContainer } from "./header.container";

const COMPONENTS: any = [HeaderComponent, HeaderContainer];

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class HeaderModule {}
