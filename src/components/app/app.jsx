import React from 'react';
import {Switch, Route} from "react-router-dom";

import MainPage from "../main-page/main-page";
import Login from "../login/login";
import withLoginFormSubmit from "../../hocs/with-login-form-submit/with-login-form-submit";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import withAuth from "../../hocs/with-auth/with-auth";
import withoutAuth from "../../hocs/without-auth/without-auth";


const LoginWrapped = withLoginFormSubmit(Login);

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage}/>
      <Route path="/favorites" exact component={withAuth(Favorites)}/>
      <Route path="/login" exact component={withoutAuth(LoginWrapped)}/>
      <Route path="/offer/:id" exact component={Offer}/>
    </Switch>
  );
};

App.propTypes = {};
