import { createAction, props } from "@ngrx/store";

export const searchCompanies = createAction("[Find Company Page] Search Companies", props<{ query: string }>());

export type FindCompanyPageActionsUnion = ReturnType<typeof searchCompanies>;
