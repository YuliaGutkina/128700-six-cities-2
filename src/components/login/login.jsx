import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation} from "../../reducer/user/user";


const Login = (props) => {
  const {onFormSubmit, onRequireAuthorization, onInputChange} = props;

  return <main className="page__main page__main--login">
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form
          className="login__form form"
          action="#"
          method="post"
          onSubmit={(e) => {
            e.preventDefault(e);
            onRequireAuthorization(onFormSubmit());
          }}
        >
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={onInputChange}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={onInputChange}
            />
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  </main>;
};

Login.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onRequireAuthorization: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  onRequireAuthorization: ({email, password}) => {
    dispatch(Operation.requireAuthorization({email, password}));
  },
});


export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
