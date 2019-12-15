import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import OfferCard from "../offer-card/offer-card";
import {ActionCreator} from "../../reducer/data/data";
import {ComplexPropType} from "../../types/types";


class OffersList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {places, className, cardClassName, imageWrapperClassName, cardInfoClassName, imageWidth, imageHeight, onSetActiveOffer = () => {}} = this.props;

    return <div className={className}>
      {places.map((offer) => <OfferCard
        cardClassName={cardClassName}
        imageWrapperClassName={imageWrapperClassName}
        cardInfoClassName={cardInfoClassName}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        key={offer.id}
        offer={offer}
        onHover={(item) => {
          onSetActiveOffer(item);
        }}
      />)}
    </div>;
  }

  componentWillUnmount() {
    const {onSetActiveOffer = () => {}} = this.props;

    onSetActiveOffer(null);
  }
}

OffersList.propTypes = {
  places: PropTypes.arrayOf(ComplexPropType.OFFER),
  onSetActiveOffer: PropTypes.func,
  className: PropTypes.string,
  cardClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  cardInfoClassName: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number
};

const mapDispatchToProps = (dispatch) => ({
  onSetActiveOffer: (item) => {
    dispatch(ActionCreator.setActiveOffer(item));
  },
});


export {OffersList};
export default connect(null, mapDispatchToProps)(OffersList);
