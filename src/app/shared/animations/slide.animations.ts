import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideFromRight = trigger("slide", [
    state("true", style({ transform: "translateX(-100%)" })),
    state("false", style({ transform: "translateX(100%)" })),
    transition("* => *", animate(500))
]);
