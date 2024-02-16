import { createReducer, on } from '@ngrx/store';
import { SectionState } from '../states/section.state';
import * as  SectionActions from "../actions/section.actions";

export const initialState: SectionState = {
    section: []
}


export const sectionReducer = createReducer(
    initialState,
    on(SectionActions.addSection, (state, { section }) => ({
        ...state,
        section: [...state.section, section],
    })),
    on(SectionActions.updateSection, (state, { section }) => ({
        ...state,
        section: state.section.map((s) => (s.id === section.id ? section : s)),
    })),
    on(SectionActions.deleteSection, (state, { sectionId }) => ({
        ...state,
        section: state.section.filter((st) => st.id !== sectionId),
    })),
    on(SectionActions.loadSection, (state, { section }) => {
        return {
            ...state,
            section: section,
        }
    }),
);