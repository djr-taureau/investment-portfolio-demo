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

    public iso3ToIso2AndName(iso3: string): any {}
}
