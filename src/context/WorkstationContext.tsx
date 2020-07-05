import React, { useContext } from 'react';
import { workStationReducer } from '../reducers/WorkstationReducer';

export interface IWorkstation {
  id: number;
  name: string;
}

export interface IWorkstationState {
  workstation: IWorkstation[];
}

export const initialWorkstationState: IWorkstationState = {
  workstation: [{ id: 0, name: '' }]
};

export interface IWorkstationStateContext {
  workstationState: IWorkstationState;
}
const initialStateContext: IWorkstationStateContext = {
  workstationState: initialWorkstationState
};
const initalDispatchContext = null;

export const WorkstationStateContext = React.createContext(initialStateContext);
export const WorkstationDispatchContext = React.createContext(initalDispatchContext);

export const useWorkstationStateContext = () => useContext(WorkstationStateContext);
export const useWorkstationDispatchContext = () => useContext(WorkstationDispatchContext);

export function WorkstationContextProvider({ children }) {
  const [workstationState, dispatch] = React.useReducer(workStationReducer, initialWorkstationState);
  return (
    <WorkstationStateContext.Provider value={{ workstationState }}>
      <WorkstationDispatchContext.Provider value={dispatch}>{children}</WorkstationDispatchContext.Provider>
    </WorkstationStateContext.Provider>
  );
}
