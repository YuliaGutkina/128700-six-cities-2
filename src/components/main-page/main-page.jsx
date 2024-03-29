import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import OffersList from "../offers-list/offers-list";
import {CityMap} from "../city-map/city-map";
import Sorting from "../sorting/sorting";
import Header from "../header/header";
import Locations from "../locations/locations";
import {
  getActiveOfferSelector,
  receiveCityInfoSelector,
  receiveCityOffersSortedSelector
} from "../../reducer/data/selectors";
import {ComplexPropType} from "../../types/types";


const MainPage = (props) => {
  const {city, cityOffers, activeOffer} = props;
  const cityName = city ? city.name : ``;

  return <div className="page page--gray page--main">
    <Header/>
    <main className={classNames(`page__main page__main--index`, {
      "page__main--index-empty": !cityOffers.length
    })}>
      <h1 className="visually-hidden">Cities</h1>
      <Locations
        currentCity={cityName}
      />
      <div className="cities">
        {cityOffers.length ?
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {cityName}</b>
              <Sorting/>
              <OffersList
                className="cities__places-list places__list tabs__content"
                places={cityOffers}
                cardClassName="cities__place-card"
                imageWrapperClassName="cities__image-wrapper"
                imageWidth={260}
                imageHeight={200}
              />
            </section>
            <div className="cities__right-section">
              <CityMap
                className="cities__map"
                items={cityOffers}
                initialLocation={city.location}
                activeItem={activeOffer}
              />
            </div>
          </div> :
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property availbale at the moment in {cityName}</p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        }
      </div>
    </main>
  </div>;
};

MainPage.propTypes = {
  city: ComplexPropType.CITY_INFO,
  citiesList: PropTypes.arrayOf(ComplexPropType.CITY_INFO),
  cityOffers: PropTypes.arrayOf(ComplexPropType.OFFER),
  activeOffer: ComplexPropType.OFFER,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: receiveCityInfoSelector(state),
  cityOffers: receiveCityOffersSortedSelector(state),
  activeOffer: getActiveOfferSelector(state)
});


export {MainPage};
export default connect(mapStateToProps)(MainPage);
