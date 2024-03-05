import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';
import { serviceTypeReducer } from './reducers/service-types.reducer';
import { sectionReducer } from './reducers/section.reducer';

// Définition de l'ensemble des reducers de l'application en utilisant ActionReducerMap
export const appReducer: ActionReducerMap<AppState> = {
    serviceTypeState: serviceTypeReducer,
    sectionState: sectionReducer
}

// Fonction de log pour enregistrer les états avant et après chaque action
function log(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {

        // Appel du reducer original pour obtenir le nouvel état
        const curentState = reducer(state, action)

        // Affichage des états précédent, action en cours, et suivant dans la console
        console.log('Etats précedent', state);
        console.log('action', action);
        console.log('Etats suivant', curentState);

        // Retour du nouvel état pour être utilisé par le store
        return curentState
    }
}

// Définition des MetaReducers, ici utilisé pour le logging
export const metaReducer: MetaReducer[] = [log]