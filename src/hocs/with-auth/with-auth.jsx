import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

import {receiveUserDataSelector} from "../../reducer/user/selectors";


const withAuth = (Component) => {
  class WithAuth extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {userData} = this.props;

      return (userData) ? <Component
        {...this.props}
      /> : <Redirect to="/login"/>;
    }
  }

  WithAuth.propTypes = {
    userData: PropTypes.object
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    userData: receiveUserDataSelector(state)
  });

  return connect(mapStateToProps)(WithAuth);
};


export default withAuth;
