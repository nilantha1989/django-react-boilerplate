import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Link,
	useLocation
} from "react-router-dom";

import './App.scss';
import './custom.scss'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { Provider, useDispatch } from 'react-redux';
import store from './state/store';
import DashboardPage from './pages/DashboardPage';
import {UserListPage, UserEditPage} from './pages/UserPages'
import {PublicRoute, PrivateRoute} from './CustomRoutes';
import SignInPage, {RegisterPage, LogoutPage} from './pages/AuthPage';
import ReduxToastr from 'react-redux-toastr';
import {loadAllUsers} from './state/user';
import ModalContainer from './components/ModalContainer'



function Layout() {
	const location = useLocation();
	const dispatch = useDispatch()
	
	useEffect(()=>{
        dispatch(loadAllUsers())
    },[])

	return (
		<div>
			<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
				<a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Admin Boilerplate</a>
				<ul class="navbar-nav px-3">
					<li class="nav-item text-nowrap">
						<Link className="nav-link" to="/signout">
							Sign Out
						</Link>
					</li>
				</ul>
			</nav>

			<div className="container-fluid">
				<div className="row">
					<nav className="col-md-2 d-none d-md-block bg-light sidebar">
						<div className="sidebar-sticky" >
							<ul className="nav flex-column">
								<li className="nav-item">
									<Link className={location.pathname==="/"? "nav-link active":"nav-link"} to="/">
										Dashboard
									</Link>
								</li>
								<li className="nav-item">
									<Link className={location.pathname==="/users"? "nav-link active":"nav-link"} to="/users">
										Users
									</Link>
								</li>
							</ul>
						</div>
					</nav>
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-5 pt-5">
						<Breadcrumbs/>
						<PrivateRoute component={DashboardPage} exact path="/" />
						<PrivateRoute component={UserListPage} exact path="/users" />
						<PrivateRoute component={UserEditPage} exact path="/users/addUser" />
						<PrivateRoute component={UserEditPage} exact path="/users/editUser/:userId" />
					</main>
				</div>
			</div>
		</div>
	)
}

function App() {
	return (
		<Provider store={store}>
			<ReduxToastr
				timeOut={2000}
				transitionIn='fadeIn'
				transitionOut='fadeOut'
				closeOnToastrClick={true}
			/>
			<Router>
				<div className="App">
					<Switch>
						<PublicRoute restricted={true} component={SignInPage} path="/signin" exact />
						<PrivateRoute component={LogoutPage} path="/signout" exact />
						<PrivateRoute component={RegisterPage} path="/register" exact />
						<PrivateRoute component={Layout} path="/" />

					</Switch>
					<ModalContainer/>

				</div>
			</Router>
		</Provider>
	);
}

const breadcrumbNameMap = {
    '/users': 'Users',
    '/users/addUser': 'Add User',
    '/users/editUser': 'Edit User',
};


function Breadcrumbs() {

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
		<nav aria-label="breadcrumb" className="mb-5">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><Link to={'/'} >Home</Link></li>
				{pathnames.map((value, index) => {
					const last = index === pathnames.length - 1;
					const to = `/${pathnames.slice(0, index + 1).join('/')}`;
					return last ? (
						<li key={to} class="breadcrumb-item active" aria-current="page">{breadcrumbNameMap[to]}</li>
					) : (
							
						<li key={to} class="breadcrumb-item"><Link to={to} >{breadcrumbNameMap[to]}</Link></li>
					);
				})}
			</ol>
		</nav>
    );
}

export default App;
