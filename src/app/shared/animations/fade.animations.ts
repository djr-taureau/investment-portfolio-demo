import { animate, group, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const simpleFade = trigger("simpleFade", [
    // the "in" style determines the "resting" state of the element when it is visible.
    state("true", style({ opacity: 1 })),
    state("false", style({ opacity: 0 })),

    // fade in when created. this could also be written as transition('void => *')
    transition("true => false", [style({ opacity: 0 }), animate(300)]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition("false => true", [style({ opacity: 1 }), animate(200)])
]);

export function fadeIn(selector: string, duration = "400ms ease-out") {
    return [
        transition(selector, [
            query(
                selector,
                [
                    style({ opacity: 0, transform: "translateY(-5px)" }),
                    stagger("250ms", [
                        animate(
                            duration,
                            style({
                                opacity: 1,
                                transform: "translateY(0px)"
                            })
                        )
                    ])
                ],
                { optional: true }
            )
        ])
    ];
}

export function fadeOut(selector = ":leave", duration = "200ms") {
    return [
        transition("* => *", [
            query(
                selector,
                [
                    style({ opacity: 1 }),
                    stagger("50ms", [
                        animate(
                            duration,
                            style({
                                opacity: 0
                            })
                        )
                    ])
                ],
                { optional: true }
            )
        ])
    ];
}
