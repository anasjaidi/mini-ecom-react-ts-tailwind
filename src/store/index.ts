import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';

interface IUiInitialState {
  cartOpen: boolean;
  checkoutOpen: boolean;
  item: {
    itemIsOpen: boolean;
    currentItem: number | null;
  };
}

const uiInitialState: IUiInitialState = {
  cartOpen: false,
  checkoutOpen: false,
  item: {
    itemIsOpen: false,
    currentItem: null,
  },
};

interface IAuthInitialState {
  isConnected: boolean;
  email: string;
}

const authInitialState: IAuthInitialState = {
  isConnected: false,
  email: '',
};

export const {
  reducer: authReducer,
  actions: { setConnected, setEmail },
} = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const {
  reducer: uiReducer,
  actions: { toggleCart, toggleCheckout, setItem },
} = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    setItem(
      state,
      action: PayloadAction<{ itemIsOpen: boolean; currentItem: number | null }>
    ) {
      state.item = action.payload;
    },
    toggleCheckout: (state) => {
      state.checkoutOpen = !state.checkoutOpen;
    },
  },
});

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
