import { createAction, props } from '@ngrx/store';
import { sectionModel } from '../models/section.model';
import { sectionInterface } from 'src/app/entities/sectionInterface';

export const addSection = createAction('[Section] Add Section', props<{ section: sectionModel }>());

export const updateSection = createAction('[Section] Update Section', props<{ section: sectionModel }>());

export const deleteSection = createAction('[Section] Delete Section', props<{ sectionId: number }>())

export const loadSection = createAction(
    '[Section] Set Section',
    props<{ section: sectionInterface[] }>()
);

export const updateSections = createAction(
    '[Section] Update of Sections',
    props<{ section: sectionInterface }>()
);