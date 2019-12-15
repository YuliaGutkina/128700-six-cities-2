import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import Header from "../header/header";
import {
  receiveNearbyOffersSelector, receiveOfferCommentsSelector,
  receiveOfferSelector
} from "../../reducer/data/selectors";
import Bookmark from "../bookmark/bookmark";
import {ReviewsList} from "../reviews-list/reviews-list";
import {CityMap} from "../city-map/city-map";
import {OffersList} from "../offers-list/offers-list";
import {Operation} from "../../reducer/data/data";
import {Rating} from "../rating/rating";
import withReviewFormSubmit from "../../hocs/with-review-form-submit/with-review-form-submit";
import {ReviewForm} from "../review-form/review-form";
import {receiveUserDataSelector} from "../../reducer/user/selectors";


const ReviewFormWrapped = withReviewFormSubmit(ReviewForm);

class Offer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offerData, userData, nearbyOffers, comments = []} = this.props;

    return <div className="page">
      <Header/>
      {offerData &&
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offerData.images.slice(0, 6).map((img) =>
                  <div
                    key={img}
                    className="property__image-wrapper"
                  >
                    <img className="property__image" src={img} alt="Photo studio" />
                  </div>
                )}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offerData.isPremium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offerData.title}
                  </h1>
                  <Bookmark
                    offer={offerData}
                    className="property__bookmark-button"
                    iconClassName="property__bookmark-icon"
                    isLarge
                  />
                </div>
                <Rating
                  className="property__rating"
                  starsClassName="property__stars"
                  value={offerData.rating}
                />
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offerData.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offerData.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offerData.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{offerData.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offerData.goods.map((item) =>
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={classNames(
                          `user__avatar-wrapper`,
                          `property__avatar-wrapper`,
                          {
                            "property__avatar-wrapper--pro": offerData.host.isPro
                          }
                      )}
                    >
                      <img className="property__avatar user__avatar" src={`/${offerData.host.avatar}`} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offerData.host.name}
                    </span>
                    {offerData.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offerData.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews · <span className="reviews__amount">{comments.length}</span></h2>
                  <ReviewsList comments={comments.slice(0, 10)}/>
                  {userData &&
                    <ReviewFormWrapped
                      offerId={offerData.id}
                    />
                  }
                </section>
              </div>
            </div>
            <CityMap
              className="property__map"
              items={[offerData, ...nearbyOffers]}
              initialLocation={offerData.location}
              activeItem={offerData}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList
                className="near-places__list"
                places={nearbyOffers}
                cardClassName="near-places__card"
                imageWrapperClassName="near-places__image-wrapper"
                imageWidth={260}
                imageHeight={200}
              />
            </section>
          </div>
        </main>
      }
    </div>;
  }

  componentDidMount() {
    const {onLoadComments, match} = this.props;

    onLoadComments(match.params.id);
  }
}

Offer.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  offerData: PropTypes.object,
  nearbyOffers: PropTypes.array,
  onLoadComments: PropTypes.func,
  match: PropTypes.object,
  comments: PropTypes.array
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state),
  offerData: receiveOfferSelector(state, ownProps.match.params.id),
  nearbyOffers: receiveNearbyOffersSelector(state, ownProps.match.params.id).slice(0, 3),
  comments: receiveOfferCommentsSelector(state, ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComments: (offerId) => {
    dispatch(Operation.loadComments(offerId));
  },
});


export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Offer));

