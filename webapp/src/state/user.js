import { createSlice } from '@reduxjs/toolkit';
import { showToastSuccess, showToastError } from '../utils/toastHelper';
import * as api from '../api';

const initState = {
    allUsers:{
        allIds:[],
        byId:{},
        isLoading:false
    },
    subscription:{
        allIds:[1,2,3],
        byId:{
            1:"Free",
            2:"Basic",
            3:"Premium"
        }
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        setAllUsers(state, { action, payload }){
            let users = [];
            for(var usr of payload){
                users.push(usr.id);
                state.allUsers.byId[usr.id] = usr;
            }
            state.allUsers.allIds = users
        },
        setUser(state, { action, payload }){
            state.allUsers.byId[payload.id] = payload
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


export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;


export function loadAllUsers(){
    return async (dispatch, getState) => {
        try{
            dispatch(userActions.setLoading({field:"allUsers", isLoading:true}))
            const response = await api.getUsers();
            dispatch(userActions.setAllUsers(response.data));
        }catch{
            dispatch(showToastError('Error', 'Error loading user profile'));
        }finally{
            dispatch(userActions.setLoading({field:"allUsers", isLoading:true}))
        }
    }
}