import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import auth from "./services/authService";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovie from "./components/newMovie";
import Logout from "./components/logout";
import "./App.css";

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        const user = auth.getCurrentUser()
        this.setState({ user })
    }

    render() {
        // console.log(this.state.user)
        const x = this.state.user
        return (
            <React.Fragment>
                <NavBar user={this.state.user} />
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/movies/new" component={NewMovie} />
                        <Route path="/movies/:id" component={MovieForm} />
                        {/* <Route path="/movies" component={Movies} /> */}
                        <Route path="/movies" render={ props => <Movies {...props} user={x}/> } />

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
