import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {


    const { auth, validateToken } = useContext(AuthContext);

    useEffect(() => {

        validateToken();

    }, [validateToken])


    if(auth.checking){
       return <h1>Esperando respuesta...</h1>
    }

    return (
        <Router>
            <div>

                <Switch>
                    <PublicRouter isAuthenticated= { auth.logged } path="/auth/" component ={ AuthRouter } />
                    <PrivateRouter  isAuthenticated= { auth.logged } exact path="/" component ={ ChatPage } />

                    <Redirect  to= "/" />

                </Switch>

            </div>
    </Router>
    )
}
