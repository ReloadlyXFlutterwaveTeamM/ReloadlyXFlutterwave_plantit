import { createContext } from 'react';
import { authInitialState, alertInitialState } from '../initialState';

export const AuthContext = createContext(authInitialState);

export const AlertContext = createContext(alertInitialState);
