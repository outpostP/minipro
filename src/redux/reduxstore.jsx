import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reduxtokenyoinker'
import  AuthReducer  from './reducerwat';

const store = configureStore({
  reducer: {
    account: accountReducer,
    AuthReducer: AuthReducer

  },
});

export default store;
