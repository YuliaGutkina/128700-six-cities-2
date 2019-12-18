import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classNames from "classnames";

import Header from "../header/header";
import {receiveFavoriteSelector} from "../../reducer/data/selectors";
import {OffersList} from "../offers-list/offers-list";
import {ComplexPropType} from "../../types/types";
import {Operation} from "../../reducer/data/data";


class Favorites extends PureComponent {
  componentDidMount() {
    this.props.onLoadFavorite();
  }

  render() {
    const {favorite} = this.props;

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
                  <OffersList
                    className="favorites__places"
                    places={cityGroup.offers}
                    cardClassName="favorites__card"
                    imageWrapperClassName="favorites__image-wrapper"
                    cardInfoClassName="favorites__card-info"
                    imageWidth={150}
                    imageHeight={110}
                  />
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
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>;
  }
}

Favorites.propTypes = {
  favorite: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string,
        offers: PropTypes.arrayOf(ComplexPropType.OFFER)
      })
  ),
  onLoadFavorite: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorite: receiveFavoriteSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavorite: () => {
    dispatch(Operation.loadFavorite());
  },
});


export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
