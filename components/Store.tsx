import React, { ReactChildren, ReactElement, createContext, Dispatch, Reducer, useReducer } from 'react';
import Cookies from 'js-cookie';

interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  type: string;
}

interface PropTypes {
  darkMode: boolean;
  cart: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cartItem: [] | any;
  };
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
  cart: {
    cartItem: Cookies.get('cartItems') ? JSON.parse(`${Cookies.get('cartItems')}`) : [],
  },
};

const reducer: Reducer<PropTypes, Actions> = (state, action) => {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    case 'ADD_TO_CART': {
      const newItem = action.payload;
      // if exist
      const existItem = state.cart.cartItem.find((item: { _id: number }) => item._id === newItem._id);

      // if item on the list
      const cartItem = existItem
        ? state.cart.cartItem.map((item: { name: string }) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItem, newItem];

      Cookies.set('cartItems', JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };
    }

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
