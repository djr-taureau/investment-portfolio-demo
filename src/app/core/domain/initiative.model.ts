import { TeamMember } from "@core/domain/company.model";

export enum InitiativeStatusEnum {
    GOOD = "GOOD",
    WARNING = "WARNING",
    BAD = "BAD",
    NEUTRAL = "NEUTRAL"
}
export interface Initiative {
    id: string;
    companyId: string;
    status: InitiativeStatusEnum;
    title: string;
    initiativeOwner: TeamMember;
    description: string;
}
