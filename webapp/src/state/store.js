import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { authReducer } from './auth';
import { userReducer } from './user';

export default configureStore({
    reducer: combineReducers({
        toastr: toastrReducer,
        auth:authReducer,
        user:userReducer,
    })
})