import { ServiceTypesState } from "./states/service-types.state";
import { SectionState } from "./states/section.state";

export interface AppState {
    serviceTypeState: ServiceTypesState;
    sectionState: SectionState
}