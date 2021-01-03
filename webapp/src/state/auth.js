import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api';
import { showToastError } from '../utils/toastHelper';

const initState = {
    profile:{},
    isSignedIn:false,
    isLoading:false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setUser(state, { action, payload }){
            state.profile = payload
            state.isSignedIn = true
        },
        removeUser(state, { action, payload }){
            state.profile = {}
            state.isSignedIn = false
        },
        setLoading(state, { action, payload }){
            state.isLoading = payload
        },
    }
});


export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;


export function getUser(){
    return async (dispatch) => {
        try{
            dispatch(authActions.setLoading(true))
            const response = await api.getMyProfile();
            dispatch(authActions.setUser(response.data));
        }catch{
            dispatch(showToastError('Error', 'Error loading user profile'));
        }finally{
            dispatch(authActions.setLoading(false))
        }
    }
}