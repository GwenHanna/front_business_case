import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ServiceTypesState } from '../states/service-types.state';

export const selectServiceTypeState = createFeatureSelector<ServiceTypesState>('serviceTypeState');

export const selectServiceTypes = createSelector(selectServiceTypeState, state => state.serviceTypes);