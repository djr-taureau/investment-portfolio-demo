import { animate, group, query, state, style, transition, trigger } from "@angular/animations";

export const simpleFade = trigger("simpleFade", [
    // the "in" style determines the "resting" state of the element when it is visible.
    state("true", style({ opacity: 1 })),
    state("false", style({ opacity: 0 })),

    // fade in when created. this could also be written as transition('void => *')
    transition("true => false", [style({ opacity: 0 }), animate(300)]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition("false => true", [style({ opacity: 1 }), animate(200)])
]);

// export const simpleFade2 = trigger("simpleFade2", [
//     transition("* <=> *", [
//         // query(":enter, :leave", style({ position: "fixed", opacity: 1 })),
//         group([
//             query("true", [style({ opacity: 0 }), animate("1000ms ease-in-out", style({ opacity: 1 }))]),
//             query("false", [style({ opacity: 1 }), animate("1000ms ease-in-out", style({ opacity: 0 }))])
//         ])
//     ])
// ]);
