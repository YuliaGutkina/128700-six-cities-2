import React from 'react';
import {Switch, Route} from "react-router-dom";

import MainPage from "../main-page/main-page";
import {Login} from "../login/login";
import withFormSubmit from "../../hocs/with-form-submit/with-form-submit";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";


const LoginWrapped = withFormSubmit(Login);

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage}/>
      <Route path="/favorites" exact component={Favorites}/>
      <Route path="/login" exact component={LoginWrapped}/>
      <Route path="/offer/:id" exact component={Offer}/>
    </Switch>
  );
};


App.propTypes = {};
