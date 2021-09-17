import React from "react";
import {Route, Switch} from "react-router-dom";
import {MemoryRouter as Router} from "react-router";
import HomePage from "./pages/HomePage/HomePage";


const Routes = () => (  
    <Router>
        <Switch>
            <Route path="/" exact component={HomePage}/>
        </Switch>
    </Router>
);

export default Routes;
