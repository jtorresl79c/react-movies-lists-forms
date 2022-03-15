import React from "react";
import { getMovie } from '../services/fakeMovieService'
import { Redirect } from "react-router-dom";

const checkIfMovieExists = (movieid) => {

    return getMovie(movieid)

}

const MovieForm = ({ match, history }) => {
    
    // Mira el codigo, al momento de que llamamos a este componente estamos esperando que retorne algo, no es como una clase en donde
    // se ejecuta el metodo render, aqui mandamos a llamar a la funcion y se retorna algo, por eso mismo no podemos usar la forma que 
    // esta comentada, porque aunque si nos reedireccionaria, no estariamos devolviendo nada logico, y react nos arrojaria un error, en
    // cambio usando la forma descomentada todo funciona correctamente porque estamos retornando un componente, el comportamiento esperado
    // de un componente
    if(!getMovie(match.params.id)) return <Redirect to="/notfound"/>
    // if(!getMovie(match.params.id)){
    //     history.push('/notfound')
    // }

    return (
        <div>
            <h1>Movie Form {match.params.id} </h1>
            <button
                className="btn btn-primary"
                onClick={() => history.push("/movies")}
            >
                Save
            </button>
        </div>
    );
};

export default MovieForm;
