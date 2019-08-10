import { Person } from "@core/domain/company.model";

export enum InitiativeStatusEnum {
    QUEUED_TO_START = "QUEUED_TO_START", // NO COLOR
    IN_PROGRESS_ON_TRACK = "IN_PROGRESS_ON_TRACK", // LIGHT GREEN
    IN_PROGRESS_NEEDS_ATTN = "IN_PROGRESS_NEEDS_ATTN", // ORANGE
    COMPLETE = "COMPLETE" // GREY
}
export interface Initiative {
    id: string;
    companyId: string;
    status: InitiativeStatusEnum;
    title: string;
    initiativeOwner: Person;
    description: string;
}
