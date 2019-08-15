import { Person } from "@core/domain/company.model";

export enum CompanyDocumentTypeEnum {
    BOARD,
    FINANCIALS,
    INVESTMENTCOMMITTEE,
    VALUATION
}

export enum CompanyDocumentFormatEnum {
    SLIDES,
    SPREADSHEET,
    DOCUMENT,
    PDF
}

export interface CompanyDocumentComment {
    userId: string;
    userName: string;
    comment: string;
}

export interface CompanyDocument {
    id: string;
    type: CompanyDocumentTypeEnum;
    format: CompanyDocumentFormatEnum;
    name: string;
    createdBy: Person;
    createdByDate: string;
    lastEditedBy: Person;
    lastEditedByDate: string;
    comments: CompanyDocumentComment[];
    password: string;
}

export interface GetAllCompanyDocumentsResponse {
    data: CompanyDocument[];
}
