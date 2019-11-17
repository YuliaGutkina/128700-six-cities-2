import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";
import {offersData} from "../../mocks/offers-data";

const Locations = (props) => {
  const {currentCity, onTabClick} = props;

  return <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {offersData.map((offer) => <li key={offer.city} className="locations__item">
          <a
            className={
              classNames(
                  `locations__item-link`,
                  `tabs__item`,
                  {"tabs__item--active": (offer.city === currentCity)}
              )}
            href="#"
            onClick={() => {
              onTabClick(offer.city);
            }}
          >
            <span>{offer.city}</span>
          </a>
        </li>)}
      </ul>
    </section>
  </div>;
};

Locations.propTypes = {
  currentCity: PropTypes.string,
  onTabClick: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.city
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
