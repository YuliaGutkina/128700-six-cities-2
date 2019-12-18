import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import Login from "../login/login";
import withLoginFormSubmit from "../../hocs/with-login-form-submit/with-login-form-submit";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import withAuth from "../../hocs/with-auth/with-auth";
import withoutAuth from "../../hocs/without-auth/without-auth";
import {Operation} from "../../reducer/user/user";
import {receiveCityInfoSelector} from "../../reducer/data/selectors";
import {ComplexPropType} from "../../types/types";


const LoginWrapped = withLoginFormSubmit(Login);

class App extends PureComponent {
  render() {
    const {city} = this.props;
    const cityName = city ? city.name : ``;

    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/${cityName}`} />
        </Route>
        <Route path="/:city" exact component={MainPage}/>
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
  onAuthCheck: PropTypes.func,
  city: ComplexPropType.CITY_INFO
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: receiveCityInfoSelector(state)
});

const mapDispatchToProps = {
  onAuthCheck: Operation.echoUser
};


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
