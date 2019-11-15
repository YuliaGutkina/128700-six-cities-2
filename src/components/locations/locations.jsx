import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const Locations = (props) => {
  const {offers, currentCity, onTabClick} = props;

  return <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {offers.map((offer) => <li key={offer.city.name} className="locations__item">
          <a
            className={
              classNames(
                  `locations__item-link`,
                  `tabs__item`,
                  {"tabs__item--active": (offer.city.name === currentCity.name)}
              )}
            href="#"
            onClick={() => {
              onTabClick(offer.city);
            }}
          >
            <span>{offer.city.name}</span>
          </a>
        </li>)}
      </ul>
    </section>
  </div>;
};

Locations.propTypes = {
  offers: PropTypes.array,
  currentCity: PropTypes.object,
  onTabClick: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
    // dispatch(ActionCreator.receiveOffers({}));
  }
});

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
