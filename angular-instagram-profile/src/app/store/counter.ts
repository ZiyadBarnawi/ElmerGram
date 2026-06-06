import { AppState } from '@core/models/appState.model';
import { createReducer, on, createAction, props } from '@ngrx/store';

let initialState = 1;

// Actions
export const increment = createAction('[Counter] Increment', props<{ value: number }>());
export const decrement = createAction('[Counter] Decrement', props<{ value: number }>());
// Reducers
export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action): number => {
    console.log(action);
    return state + 1;
  }),
  on(decrement, (state, action): number => {
    console.log(action);
    return state - 1;
  }),
);
// Selectors
export const selectCounter = (state: AppState) => state.counter;
