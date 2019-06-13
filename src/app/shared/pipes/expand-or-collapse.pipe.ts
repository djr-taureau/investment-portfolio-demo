import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "expandOrCollapse",
    pure: true
})
export class ExpandOrCollapsePipe implements PipeTransform {
    transform(isCollapsed: boolean): any {
        return !!isCollapsed === true ? "Expand" : "Collapse";
    }
}
