// import thunk from 'redux-thunk';
import MainReducer from './reducers/main.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// const middlewares=[thunk]

export const store = configureStore({
  reducer: {
    main: MainReducer,
    // flags: FlagReducer,
    // auth: AuthReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
