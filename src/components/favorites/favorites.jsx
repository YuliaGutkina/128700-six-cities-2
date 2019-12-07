import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classNames from "classnames";

import Header from "../header/header";
import {receiveUserDataSelector} from "../../reducer/user/selectors";
import {receiveFavorite} from "../../reducer/data/selectors";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {OffersList} from "../offers-list/offers-list";


const OffersListWrapped = withActiveItem(OffersList);

const Favorites = (props) => {
  const {favorite} = props;

  return <div className={classNames(`page`, {
    "page--favorites": favorite.length,
    "page--favorites-empty": !favorite.length
  })}>
    <Header/>
    <main className={classNames(`page__main page__main--favorites`, {
      "page__main--favorites-empty": !favorite.length
    })}>
      <div className="page__favorites-container container">
        {favorite.length ?
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favorite.map((cityGroup) => <li key={cityGroup.city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="/">
                      <span>{cityGroup.city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <OffersListWrapped
                    places={cityGroup.offers}
                    cardClassName="favorites__card"
                    imageWrapperClassName="favorites__image-wrapper"
                    cardInfoClassName="favorites__card-info"
                    imageWidth={150}
                    imageHeight={110}
                  />
                </div>
              </li>
              )}
            </ul>
          </section>
          :
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
            </div>
          </section>
        }
      </div>
    </main>
    <footer className="footer">
      <Link className="footer__logo-link" to="/">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
      </Link>
    </footer>
  </div>;
};

Favorites.propTypes = {
  favorite: PropTypes.arrayOf(PropTypes.object),
  userData: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state),
  favorite: receiveFavorite(state)
});


export {Favorites};
export default connect(mapStateToProps)(Favorites);
