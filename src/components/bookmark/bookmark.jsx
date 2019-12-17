import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {receiveUserDataSelector} from "../../reducer/user/selectors";
import {Operation} from "../../reducer/data/data";
import {getFavoriteStatusSelector} from "../../reducer/data/selectors";
import {ComplexPropType} from "../../types/types";


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
  offer: ComplexPropType.OFFER.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  userData: ComplexPropType.USER_DATA,
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
