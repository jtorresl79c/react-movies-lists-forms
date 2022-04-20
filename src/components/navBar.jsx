import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand ms-3" to="/">
                Vidly
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/movies">
                        Movies
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/customers">
                        Customers
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/rentals">
                        Rentals
                    </NavLink>

                    {/* 
                        Existe un problema con esto, cuando se haga login y se setee el jwt en el localStorage
                        y se reedireccione al dashboard, se seguira viendo login y register (aunque ya se este logueado),
                        esto pasa porque el localStorege no se actualiza al menos que la pagina se recargue, es por eso
                        que en vez de usar un replace, se usa un window.location, para ver esto ir a: loginForm.jsx 
                    */}
                    {
                        !user && (
                            <React.Fragment>
                                <NavLink className="nav-item nav-link" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/register">
                                    Register
                                </NavLink>
                            </React.Fragment>
                        )
                    }

                    {
                        user && (
                            <React.Fragment>
                                <NavLink className="nav-item nav-link" to="/profile">
                                    {user.name}
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/logout">
                                    Logout
                                </NavLink>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
