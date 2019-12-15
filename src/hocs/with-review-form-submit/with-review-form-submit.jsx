import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation} from "../../reducer/data/data";


const withReviewFormSubmit = (Component) => {
  class WithReviewFormSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
        isDisabled: true,
      };

      this._inputChangeHandler = this._inputChangeHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._formResetHandler = this._formResetHandler.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFormSubmit={this._formSubmitHandler}
        onInputChange={this._inputChangeHandler}
        isDisabled={this.state.isDisabled}
        commentValue={this.state.comment}
        ratingValue={this.state.rating}
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

    _formResetHandler() {
      this.setState({
        rating: null,
        comment: ``,
      });
    }

    _formSubmitHandler(e) {
      const {onSendReview, offerId} = this.props;
      const {rating, comment} = this.state;

      e.preventDefault();

      this.setState({
        isDisabled: true
      });

      onSendReview(offerId, {rating, comment});
      this._formResetHandler();
    }
  }

  WithReviewFormSubmit.propTypes = {
    onSendReview: PropTypes.func.isRequired,
    offerId: PropTypes.number
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

  const mapDispatchToProps = (dispatch) => ({
    onSendReview: (offerId, values) => {
      dispatch(Operation.sendReview(offerId, values));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReviewFormSubmit);
};


export default withReviewFormSubmit;
