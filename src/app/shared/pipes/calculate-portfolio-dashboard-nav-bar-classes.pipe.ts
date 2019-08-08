import { Pipe, PipeTransform } from "@angular/core";
import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";

@Pipe({
    name: "sbpCalculatePortfolioDashboardNavBarClasses",
    pure: true
})
export class CalculatePortfolioDashboardNavBarClassesPipe implements PipeTransform {
    transform(link: PortfolioDashboardNavBarLink, selectedLink: PortfolioDashboardNavBarLink, hovered: string): any {
        return {
            selected: link.enabled && link.route === selectedLink.route,
            disabled: !link.enabled,
            hovered: link.enabled && link.route !== selectedLink.route && link.route === hovered
        };
    }
}
