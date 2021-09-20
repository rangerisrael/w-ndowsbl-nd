import React, { ReactChildren, ReactElement, createContext, Dispatch, Reducer, useReducer } from 'react';
import Cookies from 'js-cookie';

interface Actions {
  type: string;
}

interface PropTypes {
  darkMode: boolean;
}

interface InitContextProps {
  state: PropTypes;
  dispatch: Dispatch<Actions>;
}

interface PropsChildren {
  children: ReactChildren | ReactElement;
}

export const Store = createContext({} as InitContextProps);

const initialState: PropTypes = {
  // eslint-disable-next-line no-unneeded-ternary
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
};

const reducer: Reducer<PropTypes, Actions> = (state, action) => {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    default:
      return state;
  }
};

const StoreProvider = ({ children }: PropsChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;
