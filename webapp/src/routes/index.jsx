import React from "react";
import {
	BrowserRouter as Router,
	Switch
} from "react-router-dom";
import {PrivateRoute,PublicRoute} from "./CustomRoutes";

import SignInPage, {RegisterPage, LogoutPage} from '../pages/AuthPage';
import Breadcrumbs from "../components/Breadcrumbs";
import ModalContainer from "../components/ModalContainer";

import DashboardPage from '../pages/DashboardPage';
import {UserListPage, UserEditPage} from '../pages/UserPages'

import Layout from "../pages/Layout";

export const AppRoutes = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <PublicRoute restricted component={SignInPage} path="/signin" exact />
                    <PrivateRoute component={LogoutPage} path="/signout" exact />
                    <PrivateRoute component={RegisterPage} path="/register" exact />
                    <PrivateRoute component={Layout} path="/" />

                </Switch>
                <ModalContainer/>
            </div>
        </Router>
    );
}

export const LayoutRoutes = () => {
    return (
        <>
            <Breadcrumbs/>
            <PrivateRoute component={DashboardPage} exact path="/" />
            <PrivateRoute component={UserListPage} exact path="/users" />
            <PrivateRoute component={UserEditPage} exact path="/users/addUser" />
            <PrivateRoute component={UserEditPage} exact path="/users/editUser/:userId" />
        </>
    );
}