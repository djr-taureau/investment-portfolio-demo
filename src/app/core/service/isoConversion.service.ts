import { Logger } from "./../../util/logger";
import { Injectable } from "@angular/core";
import isocodes from "../../../assets/data/isocodes.json";

@Injectable({
    providedIn: "root"
})
export class IsoConversionService {
    constructor() {}

    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("IsoConversionService");
    public json: any = isocodes;

    public iso3ToIso2AndName(iso3: string): any {
        const result = this.json.find((item) => item.alpha3 === iso3);
        return result ? result.alpha2 : "";
    }
}
