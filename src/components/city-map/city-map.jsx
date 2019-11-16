import React, {PureComponent, createRef} from 'react';
import leaflet from "leaflet";
import PropTypes from "prop-types";
import {Locations} from "../locations/locations";

export class CityMap extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
    this._mapConfig = {
      icon: leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      }),
      zoom: 12
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
      const offerCords = item.coordinates;
      leaflet
        .marker(offerCords, {icon})
        .addTo(this._map);
    });
  }

  _initMap() {
    const {zoom} = this._mapConfig;
    const {initialCity} = this.props;

    this._map = leaflet.map(this._mapRef.current, {
      center: initialCity.coordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
  }

  _setMapView() {
    const {zoom} = this._mapConfig;
    const {initialCity} = this.props;

    this._map.setView(initialCity.coordinates, zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);
  }
}

CityMap.propTypes = {
  items: Locations.propTypes.offers,
  initialCity: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  })
};
