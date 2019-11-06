import React from 'react';
import PropTypes from "prop-types";
import {MainPage} from "../main-page/main-page";
import {OfferCard} from "../offer-card/offer-card";

export const App = (props) => {
  const {offers, onCardTitleClick} = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <MainPage
        offers={offers}
        onCardTitleClick={onCardTitleClick}
      />
    </div>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(
      OfferCard.propTypes.offer
  ),
  onCardTitleClick: PropTypes.func.isRequired
};
