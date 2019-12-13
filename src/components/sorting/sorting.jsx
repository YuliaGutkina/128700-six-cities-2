import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/data/data";
import {getSortingOrder} from "../../reducer/data/selectors";


const Sorting = (props) => {
  const {onChangeSorting, sortingOrder} = props;

  const _handleChange = (e) => {
    onChangeSorting(e.target.value);
  };

  return <form className="places__sorting" action="#" method="get" onSubmit={(e) => {
    e.preventDefault();
  }}>
    <span className="places__sorting-caption">Sort by</span>
    {/* <span className="places__sorting-type" tabIndex={0}>*/}
    {/* Popular*/}
    {/* <svg className="places__sorting-arrow" width={7} height={4}>*/}
    {/* <use xlinkHref="#icon-arrow-select"/>*/}
    {/* </svg>*/}
    {/* </span>*/}
    {/* <ul className="places__options places__options--custom">*/}
    {/* <li className="places__option places__option--active" tabIndex={0}>Popular</li>*/}
    {/* <li className="places__option" tabIndex={0}>Price: low to high</li>*/}
    {/* <li className="places__option" tabIndex={0}>Price: high to low</li>*/}
    {/* <li className="places__option" tabIndex={0}>Top rated first</li>*/}
    {/* </ul>*/}
    <select
      onChange={_handleChange}
      value={sortingOrder}
      className="places__sorting-type"
      id="places-sorting"
    >
      <option className="places__option" value="popular">Popular</option>
      <option className="places__option" value="to-high">Price: low to high</option>
      <option className="places__option" value="to-low">Price: high to low</option>
      <option className="places__option" value="top-rated">Top rated first</option>
    </select>
  </form>;
};

Sorting.propTypes = {
  onChangeSorting: PropTypes.func.isRequired,
  sortingOrder: PropTypes.oneOf([`popular`, `to-high`, `to-low`, `top-rated`]),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  sortingOrder: getSortingOrder(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSorting: (sortBy) => {
    dispatch(ActionCreator.changeSorting(sortBy));
  },
});


export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
