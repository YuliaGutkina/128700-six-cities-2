import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation} from "../../reducer/user/user";


const withFormSubmit = (Component) => {
  class WithFormSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {};
      this._inputChangeHandler = this._inputChangeHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFormSubmit={this._formSubmitHandler}
        onInputChange={this._inputChangeHandler}
      />;
    }

    _inputChangeHandler(e) {
      const target = e.target;
      const value = target.type === `checkbox` ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    _formSubmitHandler(e) {
      const {onRequireAuthorization} = this.props;

      e.preventDefault();
      onRequireAuthorization(this.state);
    }
  }

  WithFormSubmit.propTypes = {
    onRequireAuthorization: PropTypes.func.isRequired,
    history: PropTypes.object
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

  const mapDispatchToProps = (dispatch) => ({
    onRequireAuthorization: ({email, password}) => {
      dispatch(Operation.authorizeUser({email, password}));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFormSubmit);
};


export default withFormSubmit;
