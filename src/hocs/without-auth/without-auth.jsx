import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

import {receiveUserDataSelector} from "../../reducer/user/selectors";


const withoutAuth = (Component) => {
  class WithoutAuth extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {userData} = this.props;

      return (!userData) ? <Component
        {...this.props}
      /> : <Redirect to="/"/>;
    }
  }

  WithoutAuth.propTypes = {
    userData: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
      isPro: PropTypes.bool
    })
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    userData: receiveUserDataSelector(state)
  });

  return connect(mapStateToProps)(WithoutAuth);
};


export default withoutAuth;
