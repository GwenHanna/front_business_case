import { createAction, props } from '@ngrx/store';
import { ServiceTypes } from '../models/serviceTypes.model';
import { serviceTypesInterface } from 'src/app/entities/service_types';

export const initAction = createAction('Init app');
export const initNotAdmin = createAction('Init not admin');

export const addServiceType = createAction(
  '[ServiceType] Add ServiceType',
  props<{ serviceType: ServiceTypes }>()
);
export const updateServiceType = createAction(
  '[ServiceType] Update ServiceType',
  props<{ serviceType: ServiceTypes }>()
);
export const deleteServiceType = createAction(
  '[ServiceType] Delete ServiceType',
  props<{ serviceTypeId: number }>()
);
// Création d'une action pour définir la liste complète des types de service
export const setServiceTypes = createAction(
  '[ServiceType] Set Article Types',
  props<{ serviceTypes: serviceTypesInterface[] }>()
);
