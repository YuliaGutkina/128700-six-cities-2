import React from 'react';
import PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import Login from "../login/login";
import {Header} from "../header/header";
import {receiveUserDataSelector} from "../../reducer/user/selectors";
import withFormSubmit from "../../hocs/with-form-submit/with-form-submit";


const App = (props) => {
  const {userData} = props;
  const LoginWrapped = withFormSubmit(Login);
  const getPage = (Page) => !userData ? <LoginWrapped/> : <Page/>;

  return (
    <div className="page page--gray page--main">
      <Header
        userData={userData}
      />
      <Switch>
        <Route path="/" exact render={() => getPage(MainPage)}/>
        <Route path="/login" exact component={LoginWrapped}/>
      </Switch>
    </div>
  );
};


App.propTypes = {
  userData: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state)
});


export {App};
export default connect(mapStateToProps)(App);
