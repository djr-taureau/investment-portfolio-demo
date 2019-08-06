import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideFromRight = trigger("slideRight", [
    state("true", style({ transform: "translateX(-100%)" })),
    state("false", style({ transform: "translateX(100%)" })),
    transition("* => *", animate(500))
]);

export const slideFromTop = trigger("slideTop", [
    state("true", style({ transform: "translateY(-100%)" })),
    state("false", style({ transform: "translateY(100%)" })),
    transition("* => *", animate(500))
]);

export const expandOutFromTop = trigger("expandOutFromTop", [
    state(
        "false",
        style({
            marginTop: "0px",
            display: "",
            overflow: "hidden",
            height: "0px"
        })
    ),
    state(
        "true",
        style({
            marginTop: "10px",
            display: "*",
            // overflow: "hidden",
            height: "*"
        })
    ),
    transition("false => true", animate("300ms")),
    transition("true => false", animate("200ms"))
]);
