import React from 'react';
import PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import Login from "../login/login";
import {getAuthorizationStatusSelector} from "../../reducer/user/selectors";
import withFormSubmit from "../../hocs/with-form-submit/with-form-submit";


const App = (props) => {
  const {isAuthorizationRequired} = props;
  const LoginWrapped = withFormSubmit(Login);
  const getPage = (Page) => isAuthorizationRequired ? <LoginWrapped/> : <Page/>;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Switch>
        <Route path="/" exact render={() => getPage(MainPage)}/>
        <Route path="/login" exact component={LoginWrapped}/>
      </Switch>
    </div>
  );
};


App.propTypes = {
  isAuthorizationRequired: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatusSelector(state)
});


export {App};
export default connect(mapStateToProps)(App);
