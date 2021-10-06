/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactChildren, ReactElement, createContext, Dispatch, Reducer, useReducer } from 'react';
import Cookies from 'js-cookie';
import { IUser } from '../models/interface/Users';
import { IProduct } from '../models/interface/Product';

interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  type: string;
}

interface PropTypes {
  darkMode: boolean;
  cart: {
    cartItem: [] | any;
  };
  userInfo: IUser;
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
  userInfo: Cookies.get('userInfo') ? JSON.parse(`${Cookies.get('userInfo')}`) : null,
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
      const existItem: any = state.cart.cartItem.find((item: { _id: string }) => item._id === newItem._id);

      // if item on the list

      const cartItem = existItem
        ? state.cart.cartItem.map((item: { name: string }) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItem, newItem];

      Cookies.set('cartItems', JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };
    }
    case 'REMOVE_CART': {
      const cartItem = state.cart.cartItem.filter((item: { _id: string }) => item._id !== action.payload._id);
      Cookies.set('cartItems', JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };
    }

    case 'USER_LOGIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      return { ...state, cart: { cartItem: {} }, userInfo: null };
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
