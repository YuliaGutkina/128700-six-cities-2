import React, {PureComponent, createRef} from 'react';
import leaflet from "leaflet";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {OffersList} from "../offers-list/offers-list";
import {receiveCityInfoSelector, receiveCityOffersSelector} from "../../reducer";


class CityMap extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
    this._mapConfig = {
      icon: leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      }),
      initialLocation: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    };

    this._initMap = this._initMap.bind(this);
  }

  render() {
    return <section
      className="cities__map map"
      ref={this._mapRef}
    />;
  }

  componentDidMount() {
    this._initMap();
    this._setMapView();
    this._renderMarkers();
  }

  componentDidUpdate() {
    this._setMapView();
    this._renderMarkers();
  }

  _renderMarkers() {
    const {items} = this.props;
    const {icon} = this._mapConfig;

    items.forEach((item) => {
      const offerCords = [
        item.location.latitude,
        item.location.longitude
      ];
      leaflet
        .marker(offerCords, {icon})
        .addTo(this._map);
    });
  }

  _initMap() {
    const {currentCity} = this.props;
    const {initialLocation} = this._mapConfig;

    const location = currentCity ? currentCity.location : initialLocation;

    this._map = leaflet.map(this._mapRef.current, {
      center: [location.latitude, location.longitude],
      zoom: location.zoom,
      zoomControl: false,
      marker: true
    });
  }

  _setMapView() {
    const {currentCity} = this.props;
    const {initialLocation} = this._mapConfig;

    const location = currentCity ? currentCity.location : initialLocation;

    this._map.setView([location.latitude, location.longitude], location.zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);
  }
}

CityMap.propTypes = {
  items: OffersList.propTypes.places,
  currentCity: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  items: receiveCityOffersSelector(state),
  currentCity: receiveCityInfoSelector(state)
});


export {CityMap};
export default connect(mapStateToProps)(CityMap);
