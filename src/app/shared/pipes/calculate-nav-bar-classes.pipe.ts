import { Pipe, PipeTransform } from "@angular/core";
import { NavigationBarLink } from "../navigation-bar/navigation-bar-link";

@Pipe({
    name: "sbpCalculateNavBarClasses",
    pure: true
})
export class CalculateNavBarClassesPipe implements PipeTransform {
    transform(link: NavigationBarLink, selectedLink: string, hovered: string): any {
        return {
            selected: link.enabled && link.route === selectedLink,
            // disabled: link.route !== selectedLink && link.route !== hovered ,
            disabled: !link.enabled,
            hovered: link.enabled && link.route !== selectedLink && link.route === hovered
        };
    }
}
