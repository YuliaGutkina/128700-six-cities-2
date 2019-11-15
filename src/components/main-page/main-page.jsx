import React from 'react';
import PropTypes from "prop-types";
import {OffersList} from "../offers-list/offers-list";
import {CityMap} from "../city-map/city-map";
import Locations from "../locations/locations";

export const MainPage = (props) => {
  const {offers, city, places, onCardTitleClick} = props;

  return <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <Locations
      offers={offers}
    />
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{places.length} places to stay in {city.name}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
                    Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
            {/*
                <select class="places__sorting-type" id="places-sorting">
                  <option class="places__option" value="popular" selected="">Popular</option>
                  <option class="places__option" value="to-high">Price: low to high</option>
                  <option class="places__option" value="to-low">Price: high to low</option>
                  <option class="places__option" value="top-rated">Top rated first</option>
                </select>
                */}
          </form>
          <OffersList
            places={places}
            onCardTitleClick={onCardTitleClick}
          />
        </section>
        <div className="cities__right-section">
          <CityMap
            initialCity={city}
            items={places}
          />
        </div>
      </div>
    </div>
  </main>;
};

MainPage.propTypes = {
  offers: PropTypes.array,
  city: CityMap.propTypes.initialCity,
  places: PropTypes.array,
  onCardTitleClick: PropTypes.func.isRequired
};
