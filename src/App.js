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
import ProtectedRoute from "./components/common/ProtectedRoute";

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
        const {user} = this.state
        return (
            <React.Fragment>
                <NavBar user={user} />
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/movies/new" component={NewMovie} />
                        
                        {/* <Route path="/movies/:id" component={MovieForm} /> */}
                        <Route path="/movies/:id" render={ props => { {/* RPMID1231 ProtectedRoute se creo para evitar poner 'render if(!user) return <Redirect>...' */}
                            if(!user) return <Redirect to="/login"/>
                            return <MovieForm {...props} user={user}/>
                        } } />

                        {/* De esta forma no podemos enviar props */}
                        {/* <Route path="/movies" component={Movies} /> */}
                        {/* De esta forma tendriamos que uno por uno poner el codigo de reedireccionamiento como pasa en RPMID1231*/}
                        {/* <Route path="/movies" render={ props => <Movies {...props} user={user}/> } /> */}
                        {/* Como realmente se deberia de llamar porque es necesario mandar el render (esto del render es un tema que se llama: Render Props https://es.reactjs.org/docs/render-props.html || https://www.geeksforgeeks.org/explain-the-purpose-of-render-in-reactjs/ ) */}
                        {/* <ProtectedRoute path="/movies" component={Movies} render={ (props) => <h1>Hola mundo</h1> }/> */}
                        {/* Como lo llamamamos por comodidad, porque realmente siempre debemos de enviar el component */}
                        <ProtectedRoute path="/movies" component={Movies}/>
                        
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
