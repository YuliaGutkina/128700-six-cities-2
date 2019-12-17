import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import Login from "../login/login";
import withLoginFormSubmit from "../../hocs/with-login-form-submit/with-login-form-submit";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import withAuth from "../../hocs/with-auth/with-auth";
import withoutAuth from "../../hocs/without-auth/without-auth";
import {Operation} from "../../reducer/user/user";


const LoginWrapped = withLoginFormSubmit(Login);

class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/favorites" exact component={withAuth(Favorites)}/>
        <Route path="/login" exact component={withoutAuth(LoginWrapped)}/>
        <Route path="/offer/:id" exact component={Offer}/>
      </Switch>
    );
  }

  componentDidMount() {
    this.props.onAuthCheck();
  }
}

App.propTypes = {
  onAuthCheck: PropTypes.func
};

const mapDispatchToProps = {onAuthCheck: Operation.echoUser};

export {App};
export default connect(null, mapDispatchToProps)(App);
