import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer, metaReducer } from '../app.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer, { metaReducers: metaReducer })
  ]
})
export class StoreModuleModule { }
