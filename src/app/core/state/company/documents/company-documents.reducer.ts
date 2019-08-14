import { CompanyDocument, CompanyDocumentTypeEnum } from "@core/domain/document.model";
import { CompanyDocumentActionTypes, CompanyDocumentsActions } from "@core/state/company/documents/company-documents.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Person } from "@core/domain/company.model";

export interface State extends EntityState<CompanyDocument> {
    selectedId: string;
    selectedOwnerFilter: Person;
    selectedTypeFilter: CompanyDocumentTypeEnum;
}

export const adapter: EntityAdapter<CompanyDocument> = createEntityAdapter<CompanyDocument>({
    selectId: (doc: CompanyDocument) => doc.id
});

export const initialState: State = adapter.getInitialState({
    selectedId: "",
    selectedOwnerFilter: null,
    selectedTypeFilter: null
});

export function reducer(state = initialState, action: CompanyDocumentsActions): State {
    switch (action.type) {
        case CompanyDocumentActionTypes.GetAllDocumentsSuccess:
            return adapter.addMany(action.payload, state);
        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getSelectedOwnerFilter = (state: State) => state.selectedOwnerFilter;
export const getSelectedStatusFilter = (state: State) => state.selectedTypeFilter;
