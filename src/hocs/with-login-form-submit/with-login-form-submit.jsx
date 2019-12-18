import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {ActionCreator, Operation} from "../../reducer/user/user";


const withLoginFormSubmit = (Component) => {
  class WithLoginFormSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {};
      this._handleInputChange = this._handleInputChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    componentDidMount() {
      this.props.onNeedLogout(false);
    }

    _handleInputChange(e) {
      const target = e.target;
      const value = target.type === `checkbox` ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    _handleFormSubmit(e) {
      const {onRequireAuthorization} = this.props;

      e.preventDefault();
      onRequireAuthorization(this.state);
    }

    render() {
      return <Component
        {...this.props}
        onFormSubmit={this._handleFormSubmit}
        onInputChange={this._handleInputChange}
      />;
    }
  }

  WithLoginFormSubmit.propTypes = {
    onRequireAuthorization: PropTypes.func.isRequired,
    history: PropTypes.object,
    onNeedLogout: PropTypes.func
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

  const mapDispatchToProps = {
    onRequireAuthorization: Operation.authorizeUser,
    onNeedLogout: ActionCreator.needLogout
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithLoginFormSubmit);
};


export default withLoginFormSubmit;
