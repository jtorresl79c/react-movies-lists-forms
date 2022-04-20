import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import jwtDecode from "jwt-decode";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovie from "./components/newMovie";
import "./App.css";

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        try {
            const jwt = localStorage.getItem('token')
            const user = jwtDecode(jwt) // Si la variable token esta vacia (que no exista en el localStorage el token)
            // entonces al hacer esto jwtDecode(null) habra un error, podriamos pensar que antes de ejecutar esta linea
            // de codigo comprobar si el token existe o no, en el caso de no existir reedireccionar, el problema es que
            // si nos fijamos bien este archivo es el App.js osea que SIEMPRE se va a ejecutar y si bien podemos reedireccionar
            // eso no evitara que se arroge un error, podemos usar un try catch para evitar el error y despues reedireccionar al
            // login
            this.setState({user})
        } catch (ex) {
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar user={this.state.user} />
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/movies/new" component={NewMovie} />
                        <Route path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
