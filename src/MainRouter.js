import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from './components/Header';
import FormComponent from './components/FormComponent';
import Contact from './pages/Contact';

function MainRouter() {
    return (
        <Router basename="/koh-lanta-simulator">
            <div>
                <Header/>

                <Switch>
                    <Route exact path="/">
                        <FormComponent/>
                    </Route>
                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default MainRouter;
