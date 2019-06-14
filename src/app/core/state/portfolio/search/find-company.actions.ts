import { createAction, props } from "@ngrx/store";

export const filterCompanies = createAction("[Find Company] Filter Companies", props<{ query: string }>());

export type FindCompanyActionsUnion = ReturnType<typeof filterCompanies>;
