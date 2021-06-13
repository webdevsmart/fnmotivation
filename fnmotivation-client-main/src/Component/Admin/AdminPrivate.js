import React from 'react';
import { Redirect, Route } from 'react-router';

const AdminPrivate = ({ children, ...rest }) => {
    const token = localStorage.getItem('admiNToken')
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    token ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin-login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};


export default AdminPrivate;