import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const Protectedroute = ( { component: Component, render, ...rest } ) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.getCurrentUser())
                    return <Redirect to='/login' />
                return Component ? <Component {...props} /> : render(props);
            }}/>
    )
}

export default Protectedroute;
