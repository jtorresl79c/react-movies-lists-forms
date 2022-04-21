import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const Protectedroute = ( { path, component: Component, render } ) => {
    return (
        <Route 
            path={path} 
            render={props => {
                if (!auth.getCurrentUser())
                    return <Redirect to='/login' />
                return Component ? <Component {...props} /> : render(props);
            }}/>
    )
}

export default Protectedroute;
