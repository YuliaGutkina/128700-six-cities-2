import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator, Operation} from "../../reducer/data/data";


const withReviewFormSubmit = (Component) => {
  class WithReviewFormSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
        isDisabled: !this.props.isDisabled
      };

      this._inputChangeHandler = this._inputChangeHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFormSubmit={this._formSubmitHandler}
        onInputChange={this._inputChangeHandler}
        isDisabled={this.state.isDisabled}
      />;
    }

    _inputChangeHandler(e) {
      const target = e.target;
      const value = target.type === `checkbox` ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value,
        isDisabled: !this.state.rating || (this.state.comment.length < 50) || (this.state.comment.length > 300)
      });
    }

    _formSubmitHandler(offerId) {
      const {onSendReview} = this.props;
      const {rating, comment} = this.state;

      onSendReview(offerId, {rating, comment});
    }
  }

  WithReviewFormSubmit.propTypes = {
    onSendReview: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isDisabled: ActionCreator.isReviewFormEnabled
  });

  const mapDispatchToProps = (dispatch) => ({
    onSendReview: (offerId, values) => {
      dispatch(Operation.sendReview(offerId, values));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReviewFormSubmit);
};


export default withReviewFormSubmit;
