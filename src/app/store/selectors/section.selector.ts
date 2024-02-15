import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SectionState } from '../states/section.state';

export const selectSectionState = createFeatureSelector<SectionState>('sectionState');

export const selectSection = createSelector(selectSectionState, state => state.section);