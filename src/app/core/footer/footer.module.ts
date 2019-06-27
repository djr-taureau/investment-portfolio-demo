import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FooterComponent } from "@core/footer/footer.component";
import { FooterContainer } from "@core/footer/footer.container";

const COMPONENTS: any = [FooterComponent, FooterContainer];

@NgModule({
    imports: [CommonModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class FooterModule {}
