import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {receiveUserDataSelector} from "../../reducer/user/selectors";
import {Operation} from "../../reducer/data/data";
import {getFavoriteStatusSelector} from "../../reducer/data/selectors";


class Bookmark extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  render() {
    const {offer, className, iconClassName, isLarge} = this.props;

    return <button
      className={classNames(
          `button`,
          className,
          offer.isFavorite ? `${className}--active` : null
      )}
      type="button"
      onClick={this._handleFavoriteClick}
    >
      <svg
        className={iconClassName}
        width={isLarge ? 31 : 18}
        height={isLarge ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>;
  }

  _handleFavoriteClick() {
    const {offer, userData, history, onFavoriteClick} = this.props;

    if (!userData) {
      history.push(`/login`);
      return;
    }

    onFavoriteClick(offer);
  }
}

Bookmark.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number
      })
    }),
    preview: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
    isPremium: PropTypes.bool,
    rating: PropTypes.number,
    type: PropTypes.string,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    price: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
      avatar: PropTypes.string
    }),
    description: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number
    })
  }).isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  history: PropTypes.object,
  isFavorite: PropTypes.bool,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  isLarge: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state),
  isFavorite: getFavoriteStatusSelector(state, ownProps.offer.id)
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick: (offer) => {
    dispatch(Operation.toggleFavoriteStatus(offer));
  },
});

export {Bookmark};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Bookmark));
