import { createSlice } from "@reduxjs/toolkit";
import { showToastError } from "../utils/toastHelper";
import * as api from "../api";

const initState = {
    allUsers: {
        allIds: [],
        byId: {},
        isLoading: false,
    },
    subscription: {
        allIds: [1, 2, 3],
        byId: {
            1: "Free",
            2: "Basic",
            3: "Premium",
        },
    },
};

/* eslint-disable no-param-reassign */
// since immer enables direct state mutations
const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        setAllUsers(state, { payload }) {
            state.allUsers.allIds = [];
            payload.forEach((usr) => {
                state.allUsers.allIds.push(usr.id);
                state.allUsers.byId[usr.id] = usr;
            });
        },
        setUser(state, { payload }) {
            state.allUsers.byId[payload.id] = payload;
        },
        removeUser(state) {
            state.profile = {};
            state.isSignedIn = false;
        },
        setLoading(state, { payload }) {
            state.isLoading = payload;
        },
    },
});
/* eslint-disable no-param-reassign */

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export function loadAllUsers() {
    return async (dispatch) => {
        try {
            dispatch(
                userActions.setLoading({ field: "allUsers", isLoading: true })
            );
            const response = await api.getUsers();
            dispatch(userActions.setAllUsers(response.data));
        } catch {
            dispatch(showToastError("Error", "Error loading user profile"));
        } finally {
            dispatch(
                userActions.setLoading({ field: "allUsers", isLoading: true })
            );
        }
    };
}
