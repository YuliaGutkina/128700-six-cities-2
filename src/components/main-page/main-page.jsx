import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import {OffersList} from "../offers-list/offers-list";
import {CityMap} from "../city-map/city-map";
import Header from "../header/header";
import Locations from "../locations/locations";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {receiveCityInfoSelector, receiveCityOffersSelector} from "../../reducer/data/selectors";


const OffersListWrapped = withActiveItem(OffersList);

const MainPage = (props) => {
  const {city, cityOffers} = props;
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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                    Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                {/*
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
            */}
                {/*
                <select class="places__sorting-type" id="places-sorting">
                  <option class="places__option" value="popular" selected="">Popular</option>
                  <option class="places__option" value="to-high">Price: low to high</option>
                  <option class="places__option" value="to-low">Price: high to low</option>
                  <option class="places__option" value="top-rated">Top rated first</option>
                </select>
                */}
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersListWrapped
                  places={cityOffers}
                  cardClassName="cities__place-card"
                  imageWrapperClassName="cities__image-wrapper"
                  imageWidth={260}
                  imageHeight={200}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <CityMap
                items={cityOffers}
                currentCity={city}
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
  city: PropTypes.object,
  citiesList: PropTypes.array,
  cityOffers: OffersList.propTypes.places,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: receiveCityInfoSelector(state),
  cityOffers: receiveCityOffersSelector(state)
});


export {MainPage};
export default connect(mapStateToProps)(MainPage);
