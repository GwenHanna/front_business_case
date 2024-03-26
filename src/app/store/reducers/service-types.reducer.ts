import { createReducer, on } from '@ngrx/store';
import { ServiceTypesState } from '../states/service-types.state';
import * as ServiceTypeActions from '../actions/service-types.actions';

export const initialState: ServiceTypesState = {
  serviceTypes: [],
};

export const serviceTypeReducer = createReducer(
  initialState,
  // Lorsque l'action "setServiceTypes" est dispatchée, cette fonction est appelée pour mettre à jour l'état
  on(ServiceTypeActions.setServiceTypes, (state, { serviceTypes }) => {
    // Retourner un nouvel état en utilisant l'opérateur de propagation pour conserver les propriétés existantes
    return {
      ...state,
      // Mettre à jour la propriété "serviceTypes" avec la nouvelle liste de types de service.
      serviceTypes: serviceTypes,
    };
  }),
  // La fonction on de Ngrx permet d'écouter un évenement
  on(ServiceTypeActions.addServiceType, (state, { serviceType }) => ({
    ...state,
    serviceTypes: [...state.serviceTypes, serviceType],
  })),
  on(ServiceTypeActions.updateServiceType, (state, { serviceType }) => ({
    ...state,
    serviceTypes: state.serviceTypes.map((st) =>
      st.id === serviceType.id ? serviceType : st
    ),
  })),
  on(ServiceTypeActions.deleteServiceType, (state, { serviceTypeId }) => ({
    ...state,
    serviceTypes: state.serviceTypes.filter((st) => st.id !== serviceTypeId),
  })),
  on(ServiceTypeActions.initAction, (state) => {
    return {
      ...state,
      isAdmin: true,
    };
  }),
  on(ServiceTypeActions.initNotAdmin, (state) => {
    return {
      ...state,
      isAdmin: false,
    };
  })
);
