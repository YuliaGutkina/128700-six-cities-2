import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Header from "../header/header";
import {receiveCityInfoSelector} from "../../reducer/data/selectors";


const Login = (props) => {
  const {city, onFormSubmit, onInputChange} = props;
  const cityName = city ? city.name : ``;

  return <div className="page page--gray page--login">
    <Header/>
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={onFormSubmit}
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
            <Link className="locations__item-link" to="/">
              <span>{cityName}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  </div>;
};

Login.propTypes = {
  city: PropTypes.object,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: receiveCityInfoSelector(state),
});


export {Login};
export default connect(mapStateToProps)(Login);
