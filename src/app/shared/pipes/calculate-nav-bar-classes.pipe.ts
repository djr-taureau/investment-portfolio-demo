import { Pipe, PipeTransform } from "@angular/core";
import { NavigationBarLink } from "../navigation-bar/navigation-bar-link";

@Pipe({
    name: "sbpCalculateNavBarClasses",
    pure: true
})
export class CalculateNavBarClassesPipe implements PipeTransform {
    transform(link: NavigationBarLink, selectedLink: string, hovered: string): any {
        return {
            selected: link.route === selectedLink,
            disabled: link.route !== selectedLink && link.route !== hovered,
            hovered: link.route !== selectedLink && link.route === hovered
        };
    }
}
