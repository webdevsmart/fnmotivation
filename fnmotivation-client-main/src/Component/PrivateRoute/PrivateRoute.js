import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem('token')
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                     token  ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        </div>
    );
};

export default PrivateRoute;