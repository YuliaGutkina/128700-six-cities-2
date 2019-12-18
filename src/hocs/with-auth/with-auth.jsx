import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {receiveUserDataSelector} from "../../reducer/user/selectors";
import {ComplexPropType} from "../../types/types";


const withAuth = (Component) => {
  const WithAuth = (props) => {
    const {userData} = props;

    return (userData) ? <Component
      {...props}
    /> : <Redirect to="/login"/>;
  };

  WithAuth.propTypes = {
    userData: ComplexPropType.USER_DATA
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    userData: receiveUserDataSelector(state)
  });

  return connect(mapStateToProps)(WithAuth);
};


export default withAuth;
