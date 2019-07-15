import * as _ from "lodash";
import { v4 as uuid } from "uuid";
import * as DomainModel from "@core/domain/company.model";
import { Injectable } from "@angular/core";
import { Logger } from "@util/logger";

@Injectable({
    providedIn: "root"
})
export class ApiResponseDataTransformationService {
    /**
     * Logger.
     */
    private static logger: Logger = Logger.getLogger("ApiResponseDataTransformationService");

    /**
     * Constructor.
     */
    constructor() {
        ApiResponseDataTransformationService.logger.debug(`constructor()`);
    }

    /**
     * Maps API company entities to client company entities.
     * @param data
     */
    public mapCompanyFromApiToClient(data: any): DomainModel.Company {
        ApiResponseDataTransformationService.logger.debug(`mapCompanyFromApiToClient()`);
        return {
            ...data,
            id: this.mapApiIdToClientId(data.id),

            // NOTE: The API isn't always returning sectors for entities so we'll default one if not.
            // This helps when grouping and sorting data in the table view as well as not having
            // undefined, expected properties in the entities.
            sectors: this.mapEntitiesFromApiToClient(this.mapSectorFromApiToClient, data.sectors, data.id)
        };
    }

    /**
     * Maps API sector entities to client sector entities.
     * @param data
     * @param companyId
     */
    public mapSectorFromApiToClient(data: any, companyId: string): DomainModel.Sector {
        ApiResponseDataTransformationService.logger.debug(`mapSectorFromApiToClient()`);
        return {
            companyId: companyId || data.company_id || "",
            id: this.mapApiIdToClientId(data.id) || "",
            name: data.name || "",
            description: data.currencyDesc || ""
        };
    }

    /**
     * Maps a list of API entities to list of client entities.
     *
     * NOTE: At times the API was passing back duplicates so we'll give them a hand and remove them.
     * NOTE: At times the API isn't passing back properties that should exist so we'll create defaults.
     *
     * @param mappingFn
     * @param data
     * @param companyId
     */
    public mapEntitiesFromApiToClient(mappingFn: any, data: any[], companyId?: string): any[] {
        const entities = _.uniqBy(data, "id");
        ApiResponseDataTransformationService.logger.debug(`mapEntitiesFromApiToClient( Mapping ${entities.length} entities. )`);

        return entities.length > 0 ? entities.map((item) => mappingFn.apply(this, [item, companyId])) : [mappingFn.apply(this, [{}, companyId])];
    }

    /**
     * Converts the API's number ID property to a string property.
     * @param id
     */
    public mapApiIdToClientId(id: number): string {
        return !!id ? String(id) : uuid();
    }
}
