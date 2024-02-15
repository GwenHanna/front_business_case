import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';
import { serviceTypeReducer } from './reducers/service-types.reducer';
import { sectionReducer } from './reducers/section.reducer';

export const appReducer: ActionReducerMap<AppState> = {
    serviceTypeState: serviceTypeReducer,
    sectionState: sectionReducer
}

function log(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        const curentState = reducer(state, action)


        console.log('Etats précedent', state);
        console.log('action', action);
        console.log('Etats suivant', curentState);

        return curentState
    }
}

export const metaReducer: MetaReducer[] = [log]