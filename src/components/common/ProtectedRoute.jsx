import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const Protectedroute = ( { component: Component, render, ...rest } ) => {
    return (
        <Route
            {...rest}
            render={props => {
                console.log(props)
                if (!auth.getCurrentUser())
                    // 'to' acepta string || object (el object que se le envia recibe el nombre de location object)
                    return <Redirect to={ { 
                        pathname: '/login',
                        state: { from: props.location } // props.location contiene la direccion del componente actual a donde estabamos 
                        // intentando acceder, recuerda que cuando entramos a este componente vamos a una direccion en especifico, digamos
                        // a /movies PERO si el usuario no esta logueado entra a la condicion de if (!auth.getCurrentUser()) es ahi 
                        // en donde se da la ilusion de que ibamos a la ruta /login PERO en realidad ibamos a /movies, podemos usar esto a 
                        // nuestro favor, y es que le podemos avisar al componente /login a que direccion ibamos originalmente, para que de esta
                        // forma al momento de que el usuario se loguee, se redireccione a la ruta que estabamos intentando acceder originalmente,
                        // Ahora debemos de ir a loginForm.jsx para recibir esta informacion. #PRLFDS7453
                     } } />
                return Component ? <Component {...props} /> : render(props);
            }}/>
    )
}

export default Protectedroute;
