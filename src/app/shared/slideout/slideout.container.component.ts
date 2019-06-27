import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ToggleSlideout } from "@core/state/layout/layout.actions";
import { Logger } from "@util/logger";
import * as fromState from "@core/state";
import { filter, tap } from "rxjs/operators";

@Component({
    selector: "sbp-slideout-container",
    template: `
        <!--        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex><router-outlet name="sidebar-outlet"></router-outlet></div>-->
        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex>
            <!--            <sbp-slideout-panel></sbp-slideout-panel>-->
            <!--            <ng-content></ng-content>            -->
            <!-- Use ng-template to ensure that the generated components end up in the right place -->
            <ng-template #container></ng-template>
        </div>
    `,
    styleUrls: ["./slideout.container.component.scss"]
})
export class SlideoutContainerComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SlideoutContainerComponent");

    /**
     * Controls visibility of the slide out container
     */
    public showSlideout$: Observable<boolean>;

    /**
     * Reference to the slide out's content component.
     */
    public slideoutComponent$: Observable<Type<any>>;

    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    // Keep track of list of generated components for removal purposes
    components = [];

    /**
     * Handles closing the slideout panel
     */
    public onClose(): void {
        this.store$.dispatch(new ToggleSlideout(false));
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        SlideoutContainerComponent.logger.debug(`ngOnInit()`);
        this.showSlideout$ = this.store$.pipe(select(fromState.getShowSlideout));
        this.slideoutComponent$ = this.store$.pipe(select(fromState.getSlideoutComponent));

        this.slideoutComponent$
            .pipe(
                filter((component) => !!component),
                tap((component) => {
                    this.addComponent(component);
                })
            )
            .subscribe();
    }

    /**
     * Constructor.
     * @param store$
     */
    constructor(private store$: Store<any>, private componentFactoryResolver: ComponentFactoryResolver) {
        SlideoutContainerComponent.logger.debug(`constructor()`);
    }

    public addComponent(componentClass: Type<any>) {
        // Create component dynamically inside the ng-template
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const component = this.container.createComponent(componentFactory);

        // Push the component so that we can keep track of which components are created.
        this.components.push(component);
    }

    public removeComponent(componentClass: Type<any>) {
        // Find the component.
        const component: ComponentRef<any> = this.components.find(
            (componentRef: ComponentRef<any>) => componentRef.instance instanceof componentClass
        );
        const componentIndex = this.components.indexOf(component);

        // Remove component from both view and array.
        if (componentIndex !== -1) {
            this.container.remove(this.container.indexOf(component));
            this.components.splice(componentIndex, 1);
        }
    }
}
