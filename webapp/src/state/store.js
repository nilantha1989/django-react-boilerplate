import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { modalReducer } from "./modal";

// rtk-query demo
import appAPI from "../services/appService";
import userAPI from "../services/userService";

export default configureStore({
    reducer: combineReducers({
        toastr: toastrReducer,
        auth: authReducer,
        user: userReducer,
        modal: modalReducer,
        [appAPI.reducerPath] : appAPI.reducer,
        [userAPI.reducerPath] : userAPI.reducer
    }),
});
