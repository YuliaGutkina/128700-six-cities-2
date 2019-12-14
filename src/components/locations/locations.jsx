import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {connect} from "react-redux";

import {receiveCitiesListSelector} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/data/data";


const Locations = (props) => {
  const {citiesList, currentCity, onTabClick} = props;

  return <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesList.map((city) => <li key={city.name} className="locations__item">
          <a
            className={
              classNames(
                  `locations__item-link`,
                  `tabs__item`,
                  {"tabs__item--active": (city.name === currentCity)}
              )}
            href="#"
            onClick={() => {
              onTabClick(city.name);
            }}
          >
            <span>{city.name}</span>
          </a>
        </li>)}
      </ul>
    </section>
  </div>;
};

Locations.propTypes = {
  currentCity: PropTypes.string,
  citiesList: PropTypes.array,
  onTabClick: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  citiesList: receiveCitiesListSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  },
});


export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
