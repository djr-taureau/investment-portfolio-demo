import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from "@angular/core";
import * as fromState from "@core/state";
import { ToggleSlideout } from "@core/state/layout/layout.actions";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Logger } from "@util/logger";
import { filter, first, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class SlideOutService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SlideOutService");

    // /**
    //  * Controls visibility of the slide out container
    //  */
    // public showSlideout$: Observable<boolean>;

    /**
     * Reference to the slide out's content component.
     */
    public slideoutComponent$: Observable<Type<any>> = this.store$.pipe(select(fromState.getSlideoutComponent));

    /**
     * Keep track of list of generated components for removal purposes./
     */
    public components = [];

    /**
     * Reference to the DOM injection point for the slide-out's content.
     */
    private container: ViewContainerRef;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>, private componentFactoryResolver: ComponentFactoryResolver) {
        SlideOutService.logger.debug(`constructor()`);
    }

    /**
     * Initialize the service.
     * @param container
     */
    public init(container: ViewContainerRef): void {
        SlideOutService.logger.debug(`init()`);
        this.container = container;

        this.monitorNewContentRequests();
    }

    /**
     * Close the slide out.
     */
    public close(action?: Action): void {
        SlideOutService.logger.debug(`close( ${!!action ? "Using custom action from content." : "Using default action: ToggleSlideout"} )`);

        // Close the slide out.
        action = action || new ToggleSlideout(false);
        this.store$.dispatch(action);

        // Remove old components.
        this.removeComponent();
    }

    /**
     * Watches for new content requests and add them as the content of the slide out container.
     */
    private monitorNewContentRequests(): void {
        SlideOutService.logger.debug(`monitorNewContentRequests()`);
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
     * Add content to the slide-out container.
     * @param componentClass
     */
    public addComponent(componentClass: Type<any>) {
        SlideOutService.logger.debug(`addComponent()`);

        // Remove old components.
        this.removeComponent();

        // Create component dynamically inside the ng-template
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const componentRef = this.container.createComponent(componentFactory);
        const componentInstance = componentRef.instance;

        // Handles the close event and fires of the specific close action from the slide out content component.
        if (componentInstance.close) {
            componentInstance.close.pipe(first()).subscribe((action: any) => this.close(action));
        }

        // Push the component so that we can keep track of which components are created.
        this.components.push(componentRef);
    }

    /**
     * Remove content to the slide-out container.
     * @param componentClass
     */
    public removeComponent(componentClass?: Type<any>) {
        if (this.components.length > 0) {
            SlideOutService.logger.debug(`removeComponent()`);

            let componentIndex = 0;

            if (componentClass) {
                // Find the component.
                const component = this.components.find((componentRef) => componentRef.instance instanceof componentClass);
                componentIndex = this.components.indexOf(component);
            }

            // Default the index to 0.
            if (componentIndex < 0) {
                componentIndex = 0;
            }

            // Remove component from both view and array.
            if (componentIndex !== -1) {
                // this.container.remove(this.container.indexOf(component));
                this.container.remove(componentIndex);
                this.components.splice(componentIndex, 1);
            }
        }
    }
}
