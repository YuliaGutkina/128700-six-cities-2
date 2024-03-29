import React, {PureComponent, createRef} from 'react';
import leaflet from "leaflet";
import PropTypes from "prop-types";
import classNames from "classnames";

import {OffersList} from "../offers-list/offers-list";
import {ComplexPropType} from "../../types/types";


class CityMap extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
    this._mapConfig = {
      iconDefault: leaflet.icon({
        iconUrl: `/img/pin.svg`,
        iconSize: [30, 30]
      }),
      iconActive: leaflet.icon({
        iconUrl: `/img/pin-active.svg`,
        iconSize: [30, 30]
      })
    };

    this._initMap = this._initMap.bind(this);
    this._getLocation = this._getLocation.bind(this);
    this._setMapView = this._setMapView.bind(this);
    this._renderMarkers = this._renderMarkers.bind(this);
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
    const {items, activeItem} = this.props;
    const {iconDefault, iconActive} = this._mapConfig;

    items.forEach((item) => {
      const offerCords = [
        item.location.latitude,
        item.location.longitude
      ];
      const icon = (activeItem && item.id === activeItem.id) ? iconActive : iconDefault;
      leaflet
        .marker(offerCords, {icon})
        .addTo(this._map);
    });
  }

  _getLocation() {
    const {initialLocation} = this.props;

    return initialLocation;
  }

  _initMap() {
    const location = this._getLocation();

    this._map = leaflet.map(this._mapRef.current, {
      center: [location.latitude, location.longitude],
      zoom: location.zoom,
      zoomControl: false,
      marker: true
    });
  }

  _setMapView() {
    const location = this._getLocation();

    this._map.setView([location.latitude, location.longitude], location.zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);
  }

  render() {
    const {className} = this.props;

    return <section
      className={classNames(
          `map`,
          className
      )}
      ref={this._mapRef}
    />;
  }
}

CityMap.propTypes = {
  items: OffersList.propTypes.places,
  initialLocation: ComplexPropType.LOCATION,
  activeItem: ComplexPropType.OFFER,
  className: PropTypes.string
};


export {CityMap};
