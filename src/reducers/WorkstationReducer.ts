import { IWorkstationState } from '../context/WorkstationContext';

export interface IAction<T> {
  type: T;
  payload?: any;
}

// Constants
export enum WorkstationReducerConstants {
  addWorkstation = 'addWorkstation'
}

type IActionType = IAction<WorkstationReducerConstants>;

export const workStationReducer = (state: IWorkstationState, action: IActionType) => {
  switch (action.type) {
    case WorkstationReducerConstants.addWorkstation:
      return { ...state };
    default:
      return state;
  }
};
