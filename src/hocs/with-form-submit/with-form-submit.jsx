import React, {PureComponent} from 'react';
// import PropTypes from "prop-types";


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

    _formSubmitHandler() {
      return this.state;
    }
  }

  WithFormSubmit.propTypes = {};

  return WithFormSubmit;
};


export default withFormSubmit;
